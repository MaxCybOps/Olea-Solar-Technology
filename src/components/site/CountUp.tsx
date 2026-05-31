"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: string;
}

export default function CountUp({ value }: CountUpProps) {
  const m = String(value).match(/^([\d.]+)(.*)$/);
  const target = m ? parseFloat(m[1]) : 0;
  const suffix = m ? m[2] : "";
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const dur = 1400;
            const start = performance.now();
            const tick = (t: number) => {
              const p = Math.min(1, (t - start) / dur);
              const eased = 1 - Math.pow(1 - p, 3);
              setV(target * eased);
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  const display = target % 1 === 0 ? Math.round(v) : v.toFixed(1);

  return (
    <span ref={ref}>
      {display}
      <span style={{ color: "var(--accent)" }}>{suffix}</span>
    </span>
  );
}
