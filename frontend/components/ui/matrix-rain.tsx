"use client";

import { useEffect, useRef } from "react";

const FONT_SIZE = 14;
const CHARS = "日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ0123456789".split("");

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const COLUMN_SPACING = FONT_SIZE * 1.5;
    const columns = Math.floor(canvas.width / COLUMN_SPACING);
    const drops: number[] = new Array(columns).fill(0);

    const maxSpeed = 0.5;
    const minSpeed = 0.2;
    const speeds = new Array(columns)
      .fill(0)
      .map(() => Math.random() * (maxSpeed - minSpeed) + minSpeed);

    const activeColumns = new Array(columns)
      .fill(false)
      .map(() => Math.random() > 0.6);

    ctx.font = `${FONT_SIZE}px monospace`;

    // Check if dark mode is enabled
    const isDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const baseColor = isDarkMode ? [0, 255, 0] : [0, 180, 0]; // Slightly darker green for light mode

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        if (!activeColumns[i]) {
          if (Math.random() > 0.99) {
            activeColumns[i] = true;
          }
          continue;
        }

        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * COLUMN_SPACING;
        const y = drops[i] * FONT_SIZE;

        // Leading character with stronger opacity
        ctx.shadowBlur = 12;
        ctx.shadowColor = `rgba(${baseColor.join(",")}, 0.5)`;
        ctx.fillStyle = `rgba(${baseColor.join(",")}, ${isDarkMode ? 0.9 : 0.7})`;
        ctx.fillText(char, x, y);

        // Trail characters with adjusted opacity for light mode
        ctx.shadowBlur = 4;
        for (let j = 1; j < 4; j++) {
          const trailY = y - j * FONT_SIZE;
          if (trailY > 0) {
            const trailChar = CHARS[Math.floor(Math.random() * CHARS.length)];
            const opacity = isDarkMode
              ? 0.4 - j * 0.1 // Dark mode opacity
              : 0.5 - j * 0.12; // Light mode opacity (slightly higher)
            ctx.fillStyle = `rgba(${baseColor.join(",")}, ${opacity})`;
            ctx.fillText(trailChar, x, trailY);
          }
        }

        if (y > canvas.height) {
          if (Math.random() > 0.2) {
            activeColumns[i] = false;
            drops[i] = 0;
          } else {
            drops[i] = 0;
          }
        }

        drops[i] += speeds[i];
      }

      requestAnimationFrame(draw);
    };

    const animationId = requestAnimationFrame(draw);

    // Listen for theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleThemeChange = () => {
      // Force a redraw when theme changes
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    mediaQuery.addListener(handleThemeChange);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      mediaQuery.removeListener(handleThemeChange);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <canvas
        ref={canvasRef}
        className="pointer-events-none h-full w-full opacity-50 mix-blend-multiply dark:opacity-60 dark:mix-blend-screen"
        style={{
          background: "transparent",
        }}
      />
    </div>
  );
}
