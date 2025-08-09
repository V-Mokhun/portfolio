import React, { useEffect, useRef, useState } from "react";

export function SnakeGame({ onExit }: { onExit: (score: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [running, setRunning] = useState(true);
  const scoreRef = useRef(0);
  // board config
  const cell = 20;
  const cols = 24;
  const rows = 14;
  const border = 16; // wall thickness
  const pad = 20; // inner spacing between wall and field
  const scoreBar = 28;
  const speedMs = 120;
  const dirRef = useRef<{ x: number; y: number }>({ x: 1, y: 0 });
  const nextDirRef = useRef<{ x: number; y: number }>({ x: 1, y: 0 });
  const snakeRef = useRef<Array<{ x: number; y: number }>>([
    { x: 5, y: 7 },
    { x: 4, y: 7 },
  ]);
  const foodRef = useRef<{ x: number; y: number }>({ x: 10, y: 7 });
  const loopRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!running) return;
      switch (e.key) {
        case "ArrowUp":
        case "w":
          if (dirRef.current.y !== 1) nextDirRef.current = { x: 0, y: -1 };
          break;
        case "ArrowDown":
        case "s":
          if (dirRef.current.y !== -1) nextDirRef.current = { x: 0, y: 1 };
          break;
        case "ArrowLeft":
        case "a":
          if (dirRef.current.x !== 1) nextDirRef.current = { x: -1, y: 0 };
          break;
        case "ArrowRight":
        case "d":
          if (dirRef.current.x !== -1) nextDirRef.current = { x: 1, y: 0 };
          break;
        case "Escape":
        case "q":
          end();
          break;
      }
    };
    window.addEventListener("keydown", handleKey, { capture: true });
    return () => window.removeEventListener("keydown", handleKey, { capture: true } as any);
  }, [running]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    let last = 0;
    const step = (now: number) => {
      if (!running) return;
      if (now - last > speedMs) {
        last = now;
        update();
        draw(ctx);
      }
      loopRef.current = requestAnimationFrame(step);
    };
    draw(ctx);
    loopRef.current = requestAnimationFrame(step);
    return () => {
      if (loopRef.current) cancelAnimationFrame(loopRef.current);
    };
  }, [running]);

  function update() {
    dirRef.current = nextDirRef.current;
    const head = snakeRef.current[0];
    const next = { x: head.x + dirRef.current.x, y: head.y + dirRef.current.y };
    // walls: touching edges ends game
    if (next.x < 0 || next.x >= cols || next.y < 0 || next.y >= rows) {
      end();
      return;
    }

    // collide with self
    if (snakeRef.current.some((s) => s.x === next.x && s.y === next.y)) {
      end();
      return;
    }
    snakeRef.current = [next, ...snakeRef.current];
    if (next.x === foodRef.current.x && next.y === foodRef.current.y) {
      scoreRef.current += 1;
      placeFood();
    } else {
      snakeRef.current.pop();
    }
  }

  function placeFood() {
    while (true) {
      const x = Math.floor(Math.random() * cols);
      const y = Math.floor(Math.random() * rows);
      if (!snakeRef.current.some((s) => s.x === x && s.y === y)) {
        foodRef.current = { x, y };
        break;
      }
    }
  }

  function draw(ctx: CanvasRenderingContext2D) {
    const w = canvasRef.current!.width;
    const h = canvasRef.current!.height;
    const fieldX = border + pad;
    const fieldY = border + pad;
    const fieldW = cols * cell;
    const fieldH = rows * cell;

    // background
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#1f2937"; // panel bg
    ctx.fillRect(0, 0, w, h);

    // border frame (light gray)
    ctx.fillStyle = "#cfd2d6";
    ctx.fillRect(border, border, w - border * 2, h - border * 2 - scoreBar);

    // inner playfield (dark)
    ctx.fillStyle = "#212121";
    ctx.fillRect(fieldX, fieldY, fieldW, fieldH);

    // food (light square)
    ctx.fillStyle = "#d4d4d4";
    ctx.fillRect(
      fieldX + foodRef.current.x * cell,
      fieldY + foodRef.current.y * cell,
      cell,
      cell
    );

    // snake (neon yellow)
    ctx.fillStyle = "#d7f30b";
    snakeRef.current.forEach((s) => {
      ctx.fillRect(fieldX + s.x * cell, fieldY + s.y * cell, cell, cell);
    });

    // score text area
    ctx.fillStyle = "#e5e7eb";
    ctx.font = "bold 16px ui-monospace, SFMono-Regular, Menlo, monospace";
    ctx.fillText(`SCORE:  ${scoreRef.current}`, border + 10, h - 10);
  }

  function end() {
    if (!running) return;
    setRunning(false);
    onExit(scoreRef.current);
  }

  return (
    <div className="console-game">
      <canvas
        ref={canvasRef}
        width={border * 2 + pad * 2 + cols * cell}
        height={border * 2 + pad * 2 + rows * cell + scoreBar}
        style={{
          width: border * 2 + pad * 2 + cols * cell,
          height: border * 2 + pad * 2 + rows * cell + scoreBar,
        }}
      />
    </div>
  );
}


