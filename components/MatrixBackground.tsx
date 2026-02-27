"use client";

import { useEffect, useRef } from "react";

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const activeRef = useRef<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const frameInterval = prefersReducedMotion ? 110 : isCoarsePointer ? 70 : 40;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let resizeFrame = 0;
    let lastFrameTime = 0;

    const setCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, isCoarsePointer ? 1 : 1.4);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setCanvasSize();

    const fontSize = isCoarsePointer ? 14 : 16;
    let columns = Math.floor(width / fontSize);
    let drops = Array.from({ length: columns }, () => Math.random() * -20);

    const characters = "01ΛΣΞΦΩΔ∴∵<>/|{}[]#&$@";

    const resize = () => {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(() => {
        width = window.innerWidth;
        height = window.innerHeight;
        setCanvasSize();
        columns = Math.floor(width / fontSize);
        drops = Array.from({ length: columns }, () => Math.random() * -20);
      });
    };

    window.addEventListener("resize", resize, { passive: true });

    const onVisibilityChange = () => {
      activeRef.current = document.visibilityState === "visible";
      if (activeRef.current) {
        loop();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    const draw = () => {
      ctx.fillStyle = "rgba(3, 7, 18, 0.18)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < columns; i += 1) {
        const text =
          characters[Math.floor(Math.random() * characters.length)] ?? "0";
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const gradient = ctx.createLinearGradient(x, y - 20, x, y + 20);
        gradient.addColorStop(0, "rgba(163, 230, 53, 0.2)");
        gradient.addColorStop(0.5, "rgba(190, 242, 100, 0.8)");
        gradient.addColorStop(1, "rgba(212, 175, 55, 1)");

        ctx.fillStyle = gradient;
        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i] += 1 + Math.random() * 0.4;
      }
    };

    const loop = (timestamp = 0) => {
      if (!activeRef.current) return;
      if (timestamp - lastFrameTime >= frameInterval) {
        draw();
        lastFrameTime = timestamp;
      }
      animationRef.current = window.requestAnimationFrame(loop);
    };

    loop();

    return () => {
      activeRef.current = false;
      window.cancelAnimationFrame(resizeFrame);
      if (animationRef.current !== null) {
        window.cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="matrix-canvas"
      aria-hidden="true"
    />
  );
};

export default MatrixBackground;

