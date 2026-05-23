"use client";

import { useEffect, useRef } from "react";

interface Pixel {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  color: string;
}

export default function PixelParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const pixelsRef = useRef<Pixel[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create pixels
    const colors = [
      "rgba(249,115,22,", // orange
      "rgba(251,146,60,", // orange light
      "rgba(234,88,12,", // orange dark
      "rgba(64,64,64,", // gray
      "rgba(82,82,82,", // gray
    ];

    const pixelCount = Math.min(60, Math.floor(window.innerWidth / 25));
    pixelsRef.current = Array.from({ length: pixelCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedY: -(Math.random() * 0.3 + 0.1),
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.5 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pixelsRef.current.forEach((pixel) => {
        pixel.y += pixel.speedY;
        pixel.x += pixel.speedX;
        pixel.opacity += (Math.random() - 0.5) * 0.02;
        pixel.opacity = Math.max(0.05, Math.min(0.6, pixel.opacity));

        if (pixel.y < -10) {
          pixel.y = canvas.height + 10;
          pixel.x = Math.random() * canvas.width;
        }
        if (pixel.x < -10) pixel.x = canvas.width + 10;
        if (pixel.x > canvas.width + 10) pixel.x = -10;

        ctx.fillStyle = `${pixel.color}${pixel.opacity})`;
        ctx.fillRect(
          Math.round(pixel.x),
          Math.round(pixel.y),
          pixel.size,
          pixel.size
        );
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ opacity: 0.7 }}
    />
  );
}
