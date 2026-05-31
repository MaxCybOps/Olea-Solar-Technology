"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollFadeProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function ScrollFade({ children, delay = 0, className = "" }: ScrollFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setShown(true), delay);
            io.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`fade-up ${shown ? "in" : ""} ${className}`}>
      {children}
    </div>
  );
}
