"use client";

import { useEffect, useRef, useState } from "react";

type FromDir = "bottom" | "left" | "right" | "scale";

interface ScrollFadeProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  from?: FromDir;
}

const INIT: Record<FromDir, string> = {
  bottom: "translateY(28px)",
  left:   "translateX(-30px)",
  right:  "translateX(30px)",
  scale:  "scale(0.94) translateY(16px)",
};

export default function ScrollFade({ children, delay = 0, className = "", from = "bottom" }: ScrollFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setTimeout(() => setShown(true), delay);
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : INIT[from],
        /* Two-speed transition: opacity snaps in fast, transform eases with spring */
        transition: shown
          ? `opacity 400ms ease ${delay}ms, transform 550ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`
          : "none",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </div>
  );
}
