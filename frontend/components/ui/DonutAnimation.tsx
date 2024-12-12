'use client';

import { useEffect, useRef } from 'react';

export const DonutAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let A = 0;
  let B = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 640;
    canvas.height = 360;

    const renderFrame = () => {
      if (!ctx) return;

      // Clear canvas
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Setup text rendering
      ctx.font = '24px monospace';
      ctx.fillStyle = 'orange';

      let b: string[] = [];
      let z: number[] = [];
      const width = 80;
      const height = 22;
      const pixels = width * height;

      // Initialize arrays
      for (let k = 0; k < pixels; k++) {
        b[k] = k % width === width - 1 ? '\n' : ' ';
        z[k] = 0;
      }

      // Calculate frame
      const M = Math;
      A += 0.03;
      B += 0.01;
      const cA = M.cos(A), sA = M.sin(A);
      const cB = M.cos(B), sB = M.sin(B);

      for (let j = 0; j < 6.28; j += 0.07) {
        const ct = M.cos(j);
        const st = M.sin(j);

        for (let i = 0; i < 6.28; i += 0.02) {
          const sp = M.sin(i);
          const cp = M.cos(i);
          const h = ct + 2;
          const D = 1 / (sp * h * sA + st * cA + 5);
          const t = sp * h * cA - st * sA;
          const x = (40 + 30 * D * (cp * h * cB - t * sB)) | 0;
          const y = (12 + 15 * D * (cp * h * sB + t * cB)) | 0;
          const o = x + width * y;
          const N = (8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB)) | 0;

          if (y < height && y >= 0 && x >= 0 && x < width && D > z[o]) {
            z[o] = D;
            b[o] = ".,-~:;=!*#$@"[N > 0 ? N : 0];
          }
        }
      }

      // Render to canvas
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const char = b[x + y * width];
          if (char !== ' ') {
            ctx.fillText(char, x * 8, y * 16);
          }
        }
      }

      requestAnimationFrame(renderFrame);
    };

    const animationId = requestAnimationFrame(renderFrame);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="mx-auto rounded-[8px]"
      style={{ 
        imageRendering: 'pixelated',
        width: '100%',
        maxWidth: '360px',
        aspectRatio: '16/9'
      }}
    />
  );
}; 