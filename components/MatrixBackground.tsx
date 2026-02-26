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

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const fontSize = 16;
    let columns = Math.floor(width / fontSize);
    let drops = Array.from({ length: columns }, () => Math.random() * -20);

    const characters = "01ΛΣΞΦΩΔ∴∵<>/|{}[]#&$@";

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      columns = Math.floor(width / fontSize);
      drops = Array.from({ length: columns }, () => Math.random() * -20);
    };

    window.addEventListener("resize", resize);

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

    const loop = () => {
      if (!activeRef.current) return;
      draw();
      animationRef.current = window.requestAnimationFrame(loop);
    };

    loop();

    return () => {
      activeRef.current = false;
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

