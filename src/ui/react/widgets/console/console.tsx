import {
  LOCAL_STORAGE_ANIMATION_PREF_KEY,
  LOCAL_STORAGE_CONSOLE_HISTORY_KEY,
} from "@/consts/local-storage";
import { languages } from "@/lib/i18n";
import {
  $theme,
  setTheme,
  updateParticlesConfig,
  type Theme,
} from "@/lib/stores";
import { useStore } from "@nanostores/react";
import type { FitAddon } from "@xterm/addon-fit";
import type { Terminal } from "@xterm/xterm";
import { useEffect, useMemo, useRef, useState } from "react";
import "./console.css";
import { SnakeGame } from "./snake";
import { useFade } from "./useFade";
import "@xterm/xterm/css/xterm.css";

type CommandHandler = (input: string) => Promise<void> | void;

export const DeveloperConsole = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const termRef = useRef<Terminal | null>(null);
  const fitRef = useRef<FitAddon | null>(null);
  const historyRef = useRef<string[]>([]);
  const historyIndexRef = useRef<number>(-1);
  const bufferRef = useRef<string>("");
  const [open, setOpen] = useState(false);
  const dragStartRef = useRef<{
    x: number;
    y: number;
    left: number;
    top: number;
  } | null>(null);
  const theme = useStore($theme);

  const prompt = useMemo(() => "$ ", []);

  useEffect(() => {
    try {
      const json = localStorage.getItem(LOCAL_STORAGE_CONSOLE_HISTORY_KEY);
      if (json) {
        const arr = JSON.parse(json);
        historyRef.current = Array.isArray(arr) ? arr.slice(-100) : [];
      }
    } catch {}
  }, []);

  useEffect(() => {
    const onKeyToggle = (e: KeyboardEvent) => {
      const target = e.target as unknown as {
        closest?: (selector: string) => Element | null;
      } | null;
      const isInputElement =
        typeof target?.closest === "function"
          ? target!.closest("input, textarea, [contenteditable=true]")
          : null;
      if (isInputElement) return;
      if (e.key.toLowerCase() === "c" && (e.metaKey || e.ctrlKey)) return; // avoid copy
      if (e.key.toLowerCase() === "c" && !e.metaKey && !e.ctrlKey) {
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyToggle, { capture: true });
    return () =>
      window.removeEventListener("keydown", onKeyToggle, {
        capture: true,
      });
  }, []);

  useEffect(() => {
    if (!open) return;
    if (!containerRef.current) return;

    let disposed = false;

    const boot = async () => {
      const [{ Terminal }, { FitAddon }] = await Promise.all([
        import("@xterm/xterm"),
        import("@xterm/addon-fit"),
      ]);
      if (disposed) return;

      const term = new Terminal({
        convertEol: true,
        cursorBlink: true,
        fontSize: 14,
        theme:
          theme === "dark"
            ? {
                background: "#0b1220",
                foreground: "#e5e7eb",
                cursor: "#22d3ee",
              }
            : {
                background: "#f8fafc",
                foreground: "#0b1220",
                cursor: "#0b1220",
              },
      });
      const fit = new FitAddon();
      fitRef.current = fit;
      termRef.current = term;
      term.loadAddon(fit);
      term.open(containerRef.current!);
      fit.fit();
      term.focus();
      let suppressInput = false;

      const write = (text: string) => term.write(text.replace(/\n/g, "\r\n"));
      const writeln = (text = "") => write(text + "\r\n");
      const showPrompt = () => write(`\r\n${prompt}`);
      const renderLine = () => {
        term.write("\u001b[2K\r" + prompt + bufferRef.current);
      };

      // Fetch compact content index once
      let contentIndex: {
        blog: Array<{ title: string; slug: string }>;
        projects: Record<
          string,
          Array<{
            id: string;
            title: string;
            projectLink: string;
            sourceCodeLink: string | null;
            technologies: string[];
          }>
        >;
      } | null = null;
      const loadIndex = async () => {
        if (contentIndex) return contentIndex;
        try {
          const res = await fetch("/api/console-index");
          if (res.ok) contentIndex = await res.json();
        } catch {}
        return contentIndex;
      };

      const printHelp = () => {
        writeln("Usage: <command> [options]");
        writeln("");
        writeln("Commands:");
        writeln("  help                         Show this help");
        writeln("  history                      Show command history");
        writeln("  clear                        Clear terminal");
        writeln("  close                        Close terminal");
        writeln("  whoami                       Show short bio");
        writeln("  theme list|set <light|dark|system>");
        writeln("  lang list|set <en|pl|ua>");
        writeln("  go <home|blog|projects|about|contact>");
        writeln("  blog list [--limit=N] [--tag=foo] | blog open <slug>");
        writeln("  project list [--limit=N] | project open <n|slug>");
        writeln("  resume open | resume email");
        writeln("  contact [--subject s] [--message m]");
        writeln("  particles <noise|scale|velocity> <value>");
        writeln("  animation set <on|reduced>");
        writeln("  socials open <github|linkedin|x|email>");
        writeln("  play snake");
        writeln("");
        writeln("Tip: Press Tab for autocomplete suggestions.");
      };

      const handlers: Record<string, CommandHandler> = {
        help: () => printHelp(),
        history: () => {
          historyRef.current.forEach((h, i) => writeln(`${i + 1}: ${h}`));
        },
        clear: () => term.clear(),
        close: () => setOpen(false),
        whoami: () => {
          writeln("Volodymyr Mokhun - Software Engineer");
          writeln(
            "Passionate about building robust, scalable, and maintainable software."
          );
        },
        theme: (input) => {
          const [, sub, value] = input.split(/\s+/);
          if (sub === "list") {
            writeln("light, dark, system");
            return;
          }
          if (sub === "set") {
            if (["light", "dark", "system"].includes(value)) {
              setTheme(value as Theme);
              writeln(`Theme set to ${value}`);
            } else {
              writeln("Invalid theme. Use: light|dark|system");
            }
          }
        },
        blog: async (input) => {
          const parts = input.split(/\s+/);
          const sub = parts[1];
          if (sub === "open" && parts[2]) {
            const idx = await loadIndex();
            if (!idx) return writeln("Failed to load index");
            const n = Number(parts[2]);
            if (!Number.isNaN(n)) {
              const item = idx.blog[n - 1];
              if (item) window.location.href = `/blog/${item.slug}`;
              else writeln("Blog post not found by index");
              return;
            }
            window.location.href = `/blog/${parts[2]}`;
            return;
          }
          const idx = await loadIndex();
          if (!idx) return writeln("Failed to load index");
          const limitMatch = input.match(/--limit=(\d+)/);
          const limit = limitMatch
            ? Math.max(1, parseInt(limitMatch[1], 10))
            : Number.POSITIVE_INFINITY;
          const list = idx.blog.slice(0, limit);
          list.forEach((p, i) =>
            writeln(`${i + 1}. ${p.title}  ->  /blog/${p.slug}`)
          );
        },
        project: async (input) => {
          const parts = input.split(/\s+/);
          const sub = parts[1];
          const idx = await loadIndex();
          if (!idx) return writeln("Failed to load index");
          const lang = location.pathname.match(/^\/(pl|ua)\b/)?.[1] ?? "en";
          const list = idx.projects[lang] ?? [];
          if (sub === "open" && parts[2]) {
            const n = Number(parts[2]);
            if (!Number.isNaN(n)) {
              const item = list[n - 1];
              if (item?.projectLink) {
                window.open(item.projectLink, "_blank");
                return;
              }
              writeln("Project not found by index");
              return;
            }
            const match = list.find((p) => p.id === parts[2]);
            if (match?.projectLink) {
              window.open(match.projectLink, "_blank");
              return;
            }
            writeln("Project not found");
            return;
          }
          list
            .slice(0, 10)
            .forEach((p, i) =>
              writeln(`${i + 1}. ${p.title}  ->  ${p.projectLink}`)
            );
        },
        contact: (input) => {
          const subjectMatch = input.match(/--subject\s+"([^"]+)"/);
          const messageMatch = input.match(/--message\s+"([^"]+)"/);
          const subject = subjectMatch?.[1] ?? "Hello";
          const body = messageMatch?.[1] ?? "";
          const href = `mailto:v.mokhun@gmail.com?subject=${encodeURIComponent(
            subject
          )}&body=${encodeURIComponent(body)}`;
          window.location.href = href;
        },
        particles: (input) => {
          const [, key, val] = input.split(/\s+/);
          const num = Number(val);
          if (Number.isNaN(num)) return writeln("Value must be a number");
          if (key === "noise") {
            const quantity = Math.max(5, Math.min(200, num));
            updateParticlesConfig({ quantity });
            writeln(`Particles quantity set to ${quantity}`);
          } else if (key === "scale") {
            updateParticlesConfig({ staticity: num });
            writeln(`Particles staticity set to ${num}`);
          } else if (key === "velocity") {
            updateParticlesConfig({ vx: num, vy: num });
            writeln(`Particles velocity set to ${num}`);
          } else {
            writeln("Unknown particles setting. Use noise|scale|velocity");
          }
          updateParticlesConfig({ refresh: true });
          setTimeout(() => updateParticlesConfig({ refresh: false }), 0);
        },
        animation: (input) => {
          const [, sub, value] = input.split(/\s+/);
          if (sub === "set" && (value === "on" || value === "reduced")) {
            localStorage.setItem(LOCAL_STORAGE_ANIMATION_PREF_KEY, value);
            writeln(`Animation preference set to ${value}`);
          } else {
            writeln("Usage: animation set <on|reduced>");
          }
        },
        lang: (input) => {
          const [, sub, value] = input.split(/\s+/);
          if (sub === "list") {
            writeln(Object.keys(languages).join(", "));
            return;
          }
          if (sub === "set" && value && value in languages) {
            const url = new URL(window.location.href);
            const lang = value;
            // naive redirect preserving path after base, leveraging folders
            if (lang === "en") {
              url.pathname = url.pathname.replace(/^\/(pl|ua)/, "");
            } else {
              if (!/^\/(pl|ua)/.test(url.pathname))
                url.pathname = `/${lang}${url.pathname}`;
              else
                url.pathname = url.pathname.replace(/^\/(pl|ua)/, `/${lang}`);
            }
            window.location.href = url.toString();
          } else if (sub === "set") {
            writeln("Invalid language. Use: en|pl|ua");
          }
        },
        go: (input) => {
          const [, dest] = input.split(/\s+/);
          const map: Record<string, string> = {
            home: "/",
            blog: "/blog",
            projects: "/#projects",
            about: "/#about",
            contact: "/#contact",
          };
          const target = map[dest ?? ""];
          if (!target) return writeln("Unknown destination");
          if (
            target.startsWith("/#") &&
            document.querySelector(target.substring(2))
          ) {
            document
              .querySelector(target.substring(2))
              ?.scrollIntoView({ behavior: "smooth" });
          } else {
            window.location.href = target;
          }
        },
        resume: (input) => {
          const [, sub] = input.split(/\s+/);
          if (sub === "open") {
            window.open("/resume.pdf", "_blank");
          } else if (sub === "email") {
            const url = new URL(window.location.href);
            const resumeUrl = `${url.origin}/resume.pdf`;
            window.location.href = `mailto:v.mokhun@gmail.com?subject=Resume%20Request&body=${encodeURIComponent(resumeUrl)}`;
          } else {
            writeln("Usage: resume open | resume email");
          }
        },
        socials: (input) => {
          const [, sub, which] = input.split(/\s+/);
          if (sub !== "open")
            return writeln("Usage: socials open <github|linkedin|x|email>");
          const map: Record<string, string> = {
            github: "https://github.com/V-Mokhun",
            linkedin: "https://www.linkedin.com/in/v-mokhun",
            x: "https://x.com/v_mokhun",
            email: "mailto:v.mokhun@gmail.com",
          };
          const href = map[which ?? ""];
          if (!href) return writeln("Unknown social");
          window.open(href, "_blank");
        },
        play: (input) => {
          const [, what] = input.split(/\s+/);
          if (what !== "snake") {
            writeln("Usage: play snake");
            return;
          }
          writeln("Launching snake... Use arrows or WASD. Esc to quit.");
          const bodyEl = containerRef.current?.parentElement as HTMLElement; // .console-body
          if (!bodyEl) return;
          suppressInput = true;
          const overlay = document.createElement("div");
          overlay.className = "console-game-overlay";
          bodyEl.appendChild(overlay);

          const root = document.createElement("div");
          overlay.appendChild(root);
          import("react-dom/client").then(({ createRoot }) => {
            const r = createRoot(root);
            const exit = (score: number) => {
              r.unmount();
              bodyEl.removeChild(overlay);
              writeln(`Exited snake. Score: ${score}`);
              suppressInput = false;
              showPrompt();
            };
            r.render(<SnakeGame onExit={exit} />);
          });
        },
      };

      printHelp();
      showPrompt();

      const onResize = () => fit.fit();
      window.addEventListener("resize", onResize);
      term.onKey(({ domEvent }) => {
        if (suppressInput) return;
        if (domEvent.key === "Escape") setOpen(false);
      });

      const handleEnter = async () => {
        const input = bufferRef.current.trim();
        if (input) {
          historyRef.current.push(input);
          if (historyRef.current.length > 100) {
            historyRef.current = historyRef.current.slice(-100);
          }
          try {
            localStorage.setItem(
              LOCAL_STORAGE_CONSOLE_HISTORY_KEY,
              JSON.stringify(historyRef.current)
            );
          } catch {}
        }
        historyIndexRef.current = historyRef.current.length;
        bufferRef.current = "";
        writeln("");
        const [cmd] = input.split(/\s+/);
        const handler = handlers[cmd];
        if (handler) {
          try {
            await handler(input);
          } catch (e) {
            writeln(`Error: ${(e as Error).message}`);
          }
        } else if (input.length > 0) {
          writeln(`command not found: ${cmd}`);
        }
        showPrompt();
      };

      const showCompletions = () => {
        const input = bufferRef.current;
        const [cmd] = input.split(/\s+/);
        const all = Object.keys(handlers);
        const matches = all.filter((c) => c.startsWith(cmd));
        if (matches.length === 1) {
          bufferRef.current = matches[0] + " ";
          term.write("\u001b[2K\r" + prompt + bufferRef.current);
        } else if (matches.length > 1) {
          writeln("\n" + matches.join("  "));
          term.write(prompt + bufferRef.current);
        }
      };

      const onData = (data: string) => {
        if (suppressInput) return;
        const code = data.charCodeAt(0);
        switch (code) {
          case 13: // Enter
            handleEnter();
            break;
          case 127: // Backspace
            if (bufferRef.current.length > 0) {
              bufferRef.current = bufferRef.current.slice(0, -1);
              renderLine();
            }
            break;
          case 9: // Tab
            showCompletions();
            break;
          default:
            if (data === "\u001b[A") {
              // up
              historyIndexRef.current = Math.max(
                0,
                historyIndexRef.current - 1
              );
              const val = historyRef.current[historyIndexRef.current] ?? "";
              bufferRef.current = val;
              renderLine();
            } else if (data === "\u001b[B") {
              // down
              historyIndexRef.current = Math.min(
                historyRef.current.length,
                historyIndexRef.current + 1
              );
              const val = historyRef.current[historyIndexRef.current] ?? "";
              bufferRef.current = val;
              renderLine();
            } else {
              if (data.length === 1 && data >= " " && data !== "\u007f") {
                bufferRef.current += data;
                renderLine();
              }
            }
        }
      };

      term.onData(onData);

      const cleanup = () => {
        window.removeEventListener("resize", onResize);
        term.dispose();
      };
      (cleanupRef as any).current = cleanup;
    };

    const cleanupRef = { current: undefined as undefined | (() => void) };
    boot();

    return () => {
      disposed = true;
      cleanupRef.current?.();
    };
  }, [open, theme, prompt]);

  const phase = useFade(open);

  return (
    <div
      className={phase === "hidden" ? "hidden" : "console-overlay"}
      onClick={() => setOpen(false)}
    >
      <div
        ref={panelRef}
        className={`console-panel ${theme} ${phase}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="console-header"
          onMouseDown={(e) => {
            if (!panelRef.current) return;
            const rect = panelRef.current.getBoundingClientRect();
            dragStartRef.current = {
              x: e.clientX,
              y: e.clientY,
              left: rect.left,
              top: rect.top,
            };
            const onMove = (ev: MouseEvent) => {
              if (!dragStartRef.current || !panelRef.current) return;
              const dx = ev.clientX - dragStartRef.current.x;
              const dy = ev.clientY - dragStartRef.current.y;
              const panel = panelRef.current;
              const panelW = panel.offsetWidth;
              const panelH = panel.offsetHeight;
              const maxLeft = Math.max(0, window.innerWidth - panelW);
              const maxTop = Math.max(0, window.innerHeight - panelH);
              let nextLeft = dragStartRef.current.left + dx;
              let nextTop = dragStartRef.current.top + dy;
              // clamp to viewport
              nextLeft = Math.min(Math.max(0, nextLeft), maxLeft);
              nextTop = Math.min(Math.max(0, nextTop), maxTop);
              dragStartRef.current.left = nextLeft;
              dragStartRef.current.top = nextTop;
              dragStartRef.current.x = ev.clientX;
              dragStartRef.current.y = ev.clientY;
              panel.style.left = nextLeft + "px";
              panel.style.top = nextTop + "px";
              panel.style.position = "absolute";
            };
            const onUp = () => {
              window.removeEventListener("mousemove", onMove);
              window.removeEventListener("mouseup", onUp);
            };
            window.addEventListener("mousemove", onMove);
            window.addEventListener("mouseup", onUp);
          }}
        >
          <span>Developer Console</span>
          <button
            aria-label="Close"
            className="console-close"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
        </div>
        <div className="console-body">
          <div ref={containerRef} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};
