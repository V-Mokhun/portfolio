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
import React, { useEffect, useMemo, useRef, useState } from "react";
import "./console.css";
import { SnakeGame } from "./snake";
import { useFade } from "./useFade";

type CommandHandler = (input: string) => Promise<void> | void;

export const DeveloperConsole: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const termRef = useRef<Terminal | null>(null);
  const fitRef = useRef<FitAddon | null>(null);
  const historyRef = useRef<string[]>([]);
  const historyIndexRef = useRef<number>(-1);
  const bufferRef = useRef<string>("");
  const [open, setOpen] = useState(false);
  const theme = useStore($theme);

  const prompt = useMemo(() => "$ ", []);

  useEffect(() => {
    try {
      const json = localStorage.getItem(LOCAL_STORAGE_CONSOLE_HISTORY_KEY);
      if (json) historyRef.current = JSON.parse(json);
    } catch {}
  }, []);

  useEffect(() => {
    const onKeyToggle = (e: KeyboardEvent) => {
      const isInputElement = (e.target as HTMLElement)?.closest(
        "input, textarea, [contenteditable=true]"
      );
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
      await import("@xterm/xterm/css/xterm.css");
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
            window.location.href = `/blog/${parts[2]}`;
            return;
          }
          const links = Array.from(
            document.querySelectorAll('a[href^="/blog/"]')
          )
            .map((a) => (a as HTMLAnchorElement).href)
            .filter((href) => /\/blog\/.+/.test(href));
          if (links.length === 0) {
            writeln("No blog links found on this page. Try 'blog open <slug>'");
            return;
          }
          links.slice(0, 5).forEach((href, i) => writeln(`${i + 1}. ${href}`));
        },
        project: async (input) => {
          const parts = input.split(/\s+/);
          const sub = parts[1];
          if (sub === "open" && parts[2]) {
            const n = Number(parts[2]);
            if (!Number.isNaN(n)) {
              const cards = Array.from(
                document.querySelectorAll('#projects a[href^="http"]')
              ) as HTMLAnchorElement[];
              const link = cards[n - 1]?.href;
              if (link) window.open(link, "_blank");
              else writeln("Project not found by index");
              return;
            }
          }
          const cards = Array.from(
            document.querySelectorAll('#projects a[href^="http"]')
          ) as HTMLAnchorElement[];
          if (cards.length === 0)
            return writeln("No projects found on this page");
          cards.slice(0, 10).forEach((a, i) => writeln(`${i + 1}. ${a.href}`));
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
            projects: "#projects",
            about: "#about",
            contact: "#contact",
          };
          const target = map[dest ?? ""];
          if (!target) return writeln("Unknown destination");
          if (target.startsWith("#")) {
            document
              .querySelector(target)
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
            window.location.href = `mailto:v.mokhun.dev@gmail.com?subject=Resume%20Request&body=${encodeURIComponent(resumeUrl)}`;
          } else {
            writeln("Usage: resume open | resume email");
          }
        },
        socials: (input) => {
          const [, sub, which] = input.split(/\s+/);
          if (sub !== "open")
            return writeln("Usage: socials open <github|linkedin|x|email>");
          const map: Record<string, string> = {
            github: "https://github.com/v-mokhun",
            linkedin: "https://www.linkedin.com/in/volodymyrmokhun/",
            x: "https://x.com/v_mokhun",
            email: "mailto:v.mokhun.dev@gmail.com",
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
        className={`console-panel ${theme} ${phase}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="console-header">
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
