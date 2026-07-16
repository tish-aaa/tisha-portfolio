'use client';

import { useEffect, useRef } from 'react';

interface Sparkle {
  x: number;
  y: number;
  size: number;
  life: number;
  maxLife: number;
  driftX: number;
  driftY: number;
  color: string;
}

export default function CursorSparkles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Explicitly bail on touch/coarse-pointer devices — a hover trail
    // makes no sense without a persistent cursor, and silently trying
    // anyway is what breaks this effect on phones elsewhere.
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let sparkles: Sparkle[] = [];
    let lastSpawn = 0;

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastSpawn < 30) return; // throttle spawn rate
      lastSpawn = now;
      sparkles.push({
        x: e.clientX,
        y: e.clientY,
        size: 1.5 + Math.random() * 2.5,
        life: 0,
        maxLife: 40 + Math.random() * 25,
        driftX: (Math.random() - 0.5) * 0.6,
        driftY: (Math.random() - 0.5) * 0.6 - 0.3,
        color: Math.random() < 0.25 ? '#7C93B8' : '#F5F5F7',
      });
    };
    window.addEventListener('mousemove', onMove);

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    let frameId: number;
    const draw = () => {
      frameId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparkles = sparkles.filter((s) => s.life < s.maxLife);
      for (const s of sparkles) {
        s.life += 1;
        s.x += s.driftX;
        s.y += s.driftY;
        const progress = s.life / s.maxLife;
        const opacity = progress < 0.2 ? progress / 0.2 : 1 - (progress - 0.2) / 0.8;

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.globalAlpha = Math.max(opacity, 0);
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 6;
        drawStar(ctx, s.size * (1 - progress * 0.3));
        ctx.restore();
      }
    };
    draw();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
    />
  );
}

function drawStar(ctx: CanvasRenderingContext2D, size: number) {
  ctx.beginPath();
  for (let i = 0; i < 4; i++) {
    const angle = (Math.PI / 2) * i;
    ctx.lineTo(Math.cos(angle) * size, Math.sin(angle) * size);
    const midAngle = angle + Math.PI / 4;
    ctx.lineTo(Math.cos(midAngle) * size * 0.35, Math.sin(midAngle) * size * 0.35);
  }
  ctx.closePath();
  ctx.fill();
}
