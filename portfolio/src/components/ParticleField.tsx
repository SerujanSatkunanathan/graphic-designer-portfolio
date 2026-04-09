"use client";
import { useEffect, useRef } from "react";

export default function ParticleField() {
  const cvs = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = cvs.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    type P = { x: number; y: number; vx: number; vy: number; r: number; life: number; maxLife: number; hue: number };

    const HUES = [185, 270, 330, 210]; // cyan, purple, pink, blue
    const N = 90;

    const mk = (): P => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35 - 0.08,
      r: Math.random() * 1.6 + 0.4,
      life: Math.random() * 400,
      maxLife: 300 + Math.random() * 300,
      hue: HUES[Math.floor(Math.random() * HUES.length)],
    });

    const pts: P[] = Array.from({ length: N }, mk);
    let raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      for (const p of pts) {
        p.x += p.vx; p.y += p.vy; p.life++;
        const t = p.life / p.maxLife;
        const a = t < 0.2 ? t / 0.2 : t > 0.8 ? (1 - t) / 0.2 : 1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${a * 0.65})`;
        ctx.fill();

        if (p.life >= p.maxLife) Object.assign(p, mk());
      }

      // Constellation lines
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(0,229,255,${(1 - d / 110) * 0.055})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={cvs} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.75 }} />;
}
