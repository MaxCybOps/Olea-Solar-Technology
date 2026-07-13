"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  phase: number;
  tSpeed: number;
  isGold: boolean;
}

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;

    requestAnimationFrame(() => {
      const parent = canvas.parentElement;
      const W = parent ? parent.offsetWidth : window.innerWidth;
      const H = parent ? parent.offsetHeight : window.innerHeight;
      canvas.width  = W;
      canvas.height = H;

      // Tight cluster: upper-left ~28% wide × ~45% tall
      const ZW = W * 0.28;
      const ZH = H * 0.45;

      const N = Math.min(65, Math.floor((ZW * ZH) / 1800));

      const pts: Particle[] = Array.from({ length: N }, () => {
        const rx = Math.random();
        const ry = Math.random();
        return {
          x:  Math.pow(rx, 1.6) * ZW,
          y:  Math.pow(ry, 1.5) * ZH,
          vx: (Math.random() - 0.5) * 0.14,
          vy: (Math.random() - 0.55) * 0.10,
          r:  Math.random() * 0.9 + 0.3,   // 0.3–1.2px — small plain dots
          phase:  Math.random() * Math.PI * 2,
          tSpeed: 0.0008 + Math.random() * 0.0012,
          isGold: Math.random() < 0.70,    // ~70% gold to match screenshot
        };
      });

      const tick = (t: number) => {
        ctx.clearRect(0, 0, W, H);

        pts.forEach((p) => {
          // Gentle twinkle — alpha between 0.30 and 0.85, no glow
          const tw = 0.30 + 0.55 * (Math.sin(t * p.tSpeed + p.phase) * 0.5 + 0.5);
          const [cr, cg, cb] = p.isGold ? [249, 166, 6] : [170, 225, 195];

          // Plain dot only — zero glow
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${cr},${cg},${cb},${tw})`;
          ctx.fill();

          p.x += p.vx;
          p.y += p.vy;

          if (p.x <= 0)  { p.x  = 0;  p.vx = Math.abs(p.vx);  }
          if (p.x >= ZW) { p.x  = ZW; p.vx = -Math.abs(p.vx); }
          if (p.y <= 0)  { p.y  = 0;  p.vy = Math.abs(p.vy);  }
          if (p.y >= ZH) { p.y  = ZH; p.vy = -Math.abs(p.vy); }
        });

        raf = requestAnimationFrame(tick);
      };

      raf = requestAnimationFrame(tick);
    });

    return () => { cancelAnimationFrame(raf); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute", inset: 0,
        pointerEvents: "none", zIndex: 2,
        width: "100%", height: "100%",
      }}
    />
  );
}
