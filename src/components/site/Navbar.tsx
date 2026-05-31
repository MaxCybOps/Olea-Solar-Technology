"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, User, ChevronDown } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { useCartStore } from "@/store/cart";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const itemCount = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled ? "rgba(11,61,46,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          transition: "all 250ms cubic-bezier(0.22,1,0.36,1)",
          color: "#fff",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        }}
      >
        <div
          className="container-wide"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: scrolled ? "14px 32px" : "22px 32px",
            transition: "padding 250ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <Image
              src="/images/logo-white.png"
              alt="Olea Technologies"
              width={140}
              height={scrolled ? 36 : 44}
              style={{ height: scrolled ? 36 : 44, width: "auto", transition: "height 250ms" }}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="olea-nav-links" style={{ display: "flex", gap: 32 }}>
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    position: "relative",
                    fontSize: 15,
                    fontWeight: 500,
                    opacity: active ? 1 : 0.82,
                    transition: "opacity 200ms",
                    color: "#fff",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = active ? "1" : "0.82")}
                >
                  {link.label}
                  {active && (
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: -8,
                        height: 2,
                        background: "var(--accent)",
                        borderRadius: 9999,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="olea-nav-cta" style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {/* Cart */}
            <Link
              href="/cart"
              style={{ position: "relative", color: "#fff", opacity: 0.92, display: "flex" }}
              title="View cart"
            >
              <ShoppingBag size={22} />
              {itemCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -6,
                    right: -8,
                    background: "var(--accent)",
                    color: "var(--olea-ink)",
                    minWidth: 18,
                    height: 18,
                    padding: "0 5px",
                    borderRadius: 9999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10.5,
                    fontWeight: 700,
                  }}
                >
                  {itemCount}
                </span>
              )}
            </Link>

            <Link
              href="/contact"
              className="btn btn-primary btn-sm"
              style={{ flexShrink: 0 }}
            >
              Get a Quote →
            </Link>
          </div>

          {/* Burger */}
          <button
            className="olea-nav-burger"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            style={{
              display: "none",
              background: "transparent",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              padding: 4,
            }}
          >
            <Menu size={26} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          background: "rgba(7,41,31,0.97)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          display: "flex",
          flexDirection: "column",
          padding: "24px 28px",
          transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
          opacity: mobileOpen ? 1 : 0,
          transition: "transform 320ms cubic-bezier(0.22,1,0.36,1), opacity 320ms ease",
          pointerEvents: mobileOpen ? "auto" : "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
          <Image src="/images/logo-white.png" alt="Olea Technologies" width={130} height={38} style={{ height: 38, width: "auto" }} />
          <button onClick={() => setMobileOpen(false)} aria-label="Close menu" style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer", padding: 4 }}>
            <X size={28} />
          </button>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {NAV_LINKS.map((link, i) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 30,
                  letterSpacing: "-0.01em",
                  color: active ? "var(--accent)" : "#fff",
                  padding: "12px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? "translateY(0)" : "translateY(12px)",
                  transition: `all 400ms cubic-bezier(0.22,1,0.36,1) ${80 + i * 45}ms`,
                  display: "block",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 12, paddingTop: 24 }}>
          <Link href="/contact" className="btn btn-primary" style={{ justifyContent: "center" }} onClick={() => setMobileOpen(false)}>
            Get a Quote →
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .olea-nav-links { display: none !important; }
          .olea-nav-cta   { display: none !important; }
          .olea-nav-burger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
