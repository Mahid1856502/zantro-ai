"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Point {
  x: number;
  y: number;
  timestamp: number;
}

interface MouseTrailProps {
  containerRef: React.RefObject<HTMLElement>;
}

export default function MouseTrail({ containerRef }: MouseTrailProps) {
  const [points, setPoints] = useState<Point[]>([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const ref = useRef<SVGSVGElement>(null);

  const springConfig = { damping: 50, stiffness: 400, mass: 0.8 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const TRAIL_LENGTH = 30;
  const POINT_INTERVAL = 12;
  const MAX_AGE = 800;

  useEffect(() => {
    let lastTimestamp = 0;

    const updateMousePosition = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      // Get container bounds
      const bounds = container.getBoundingClientRect();

      // Check if mouse is within container bounds
      if (
        e.clientX < bounds.left ||
        e.clientX > bounds.right ||
        e.clientY < bounds.top ||
        e.clientY > bounds.bottom
      ) {
        // Clear points when mouse leaves container
        setPoints([]);
        return;
      }

      const now = Date.now();
      if (now - lastTimestamp > POINT_INTERVAL) {
        const svgRect = ref.current?.getBoundingClientRect();
        if (!svgRect) return;

        // Convert to container-relative coordinates
        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;

        setPoints((prevPoints) => {
          const newPoints = [...prevPoints, { x, y, timestamp: now }]
            .filter((point) => now - point.timestamp < MAX_AGE)
            .slice(-TRAIL_LENGTH);
          return newPoints;
        });

        lastTimestamp = now;
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [mouseX, mouseY, containerRef]);

  const createSmoothPath = (points: Point[]) => {
    if (points.length < 2) return "";

    const lineGenerator = (points: Point[]) => {
      // Start the path
      let path = `M ${points[0].x},${points[0].y}`;

      // Create smooth curve through all points
      for (let i = 0; i < points.length - 1; i++) {
        const current = points[i];
        const next = points[i + 1];
        const midX = (current.x + next.x) / 2;
        const midY = (current.y + next.y) / 2;

        // Calculate control points for a smoother curve
        const cp1x = midX + (current.x - midX) * 0.5;
        const cp1y = midY + (current.y - midY) * 0.5;
        const cp2x = midX + (next.x - midX) * 0.5;
        const cp2y = midY + (next.y - midY) * 0.5;

        path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${next.x},${next.y}`;
      }

      return path;
    };

    return lineGenerator(points);
  };

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg ref={ref} className="h-full w-full">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0, 255, 0, 0)" />
            <stop offset="50%" stopColor="rgba(0, 255, 0, 0.5)" />
            <stop offset="100%" stopColor="rgba(0, 255, 0, 0)" />
          </linearGradient>
        </defs>
        <g filter="url(#glow)">
          <motion.path
            d={createSmoothPath(points)}
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-[url(#gradient)]"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              mixBlendMode: "screen",
            }}
          />
        </g>
      </svg>

      {points.length > 0 && (
        <motion.div
          className="pointer-events-none absolute left-0 top-0 h-2 w-2 rounded-full bg-green-500/50 blur-[1px]"
          style={{
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
      )}
    </div>
  );
}
