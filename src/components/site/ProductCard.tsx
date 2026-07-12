"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Zap, Sun, BatteryCharging, Home, SlidersVertical, Wrench, type LucideIcon } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  inverters: Zap,
  solar_panels: Sun,
  batteries: BatteryCharging,
  systems: Home,
  charge_controllers: SlidersVertical,
  accessories: Wrench,
};

export const CATEGORY_IMAGES: Record<string, string> = {
  inverters: "/images/services/ses.jpg",
  solar_panels: "/images/services/cei.jpg",
  batteries: "/images/services/ies.jpg",
  systems: "/images/services/consulting.jpg",
  charge_controllers: "/images/services/mnt.jpg",
  accessories: "/images/services/aca.jpg",
};

const CATEGORY_LABELS: Record<string, string> = {
  inverters: "Inverters",
  solar_panels: "Solar Panels",
  batteries: "Batteries",
  systems: "Complete Systems",
  charge_controllers: "Charge Controllers",
  accessories: "Accessories",
};

interface Props {
  product: Product;
  compact?: boolean;
}

export default function ProductCard({ product: p, compact = false }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const Icon = CATEGORY_ICONS[p.category] ?? Zap;

  const discount = p.compareAtPrice && p.compareAtPrice > p.price
    ? Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100)
    : null;

  const isOutOfStock = p.stockQuantity === 0;
  const isLowStock  = !isOutOfStock && p.stockQuantity <= p.lowStockThreshold;
  const stockPct    = isLowStock ? Math.min((p.stockQuantity / p.lowStockThreshold) * 100, 100) : 100;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    if (isOutOfStock) return;
    addItem({ productId: p.id, name: p.name, price: p.price, quantity: 1, slug: p.slug });
  }

  return (
    <Link
      href={`/products/${p.slug}`}
      className="pc-card"
      style={{
        background: "#fff",
        borderRadius: 12,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        border: "1px solid var(--border-subtle)",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        transition: "box-shadow 220ms, transform 220ms",
        opacity: isOutOfStock ? 0.72 : 1,
      }}
    >
      {/* ── Image ── */}
      <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", background: "var(--olea-green-50)", flexShrink: 0 }}>
        <Image
          src={CATEGORY_IMAGES[p.category] ?? "/images/services/cei.jpg"}
          alt={p.name}
          fill
          style={{ objectFit: "cover", transition: "transform 420ms" }}
          className="pc-img"
        />

        {/* Discount badge */}
        {discount && (
          <span style={{ position: "absolute", top: 10, left: 10, background: "#e53e3e", color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 4, letterSpacing: "0.02em", zIndex: 2 }}>
            -{discount}%
          </span>
        )}

        {/* Featured badge (only when no discount) */}
        {p.isFeatured && !discount && (
          <span style={{ position: "absolute", top: 10, left: 10, background: "var(--accent)", color: "var(--olea-ink)", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 4, zIndex: 2 }}>
            Featured
          </span>
        )}

        {/* Category icon pill — bottom right */}
        <span style={{ position: "absolute", bottom: 10, right: 10, background: "rgba(7,41,31,0.72)", backdropFilter: "blur(6px)", borderRadius: 8, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
          <Icon size={15} style={{ color: "var(--accent)" }} />
        </span>

        {/* Out-of-stock scrim */}
        {isOutOfStock && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.50)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3 }}>
            <span style={{ background: "#e53e3e", color: "#fff", fontWeight: 700, fontSize: 11, padding: "5px 14px", borderRadius: 6, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* ── Body ── */}
      <div style={{ padding: compact ? "12px 14px 14px" : "14px 16px 16px", display: "flex", flexDirection: "column", flex: 1 }}>

        {/* Category label */}
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--olea-green-600)", marginBottom: 5 }}>
          {CATEGORY_LABELS[p.category] ?? p.category}
        </div>

        {/* Product name — 2-line clamp */}
        <h3 style={{ fontWeight: 600, fontSize: compact ? 13 : 14, lineHeight: 1.35, margin: "0 0 8px", color: "var(--olea-ink)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {p.name}
        </h3>

        {/* Rating */}
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 10 }}>
          <span style={{ color: "var(--accent)", fontSize: 11, letterSpacing: 1 }}>
            {"★".repeat(p.rating ?? 0)}{"☆".repeat(5 - (p.rating ?? 0))}
          </span>
          {p.reviewCount && (
            <span style={{ fontSize: 11, color: "var(--fg-2)" }}>({p.reviewCount})</span>
          )}
        </div>

        {/* Price block */}
        <div style={{ marginTop: "auto", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: compact ? 15 : 17, color: "var(--olea-ink)", fontVariantNumeric: "tabular-nums" }}>
              {formatPrice(p.price)}
            </span>
            {p.compareAtPrice && (
              <span style={{ fontSize: 12, color: "var(--fg-2)", textDecoration: "line-through", fontVariantNumeric: "tabular-nums" }}>
                {formatPrice(p.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Low-stock progress bar */}
          {isLowStock && (
            <div style={{ marginTop: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#b53030", fontWeight: 600, marginBottom: 3 }}>
                <span>Only {p.stockQuantity} left!</span>
              </div>
              <div style={{ height: 4, borderRadius: 2, background: "var(--olea-gray-200)", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${stockPct}%`, background: "#e53e3e", borderRadius: 2 }} />
              </div>
            </div>
          )}
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
            width: "100%", padding: compact ? "9px 12px" : "11px 14px",
            borderRadius: 8, border: "none",
            background: isOutOfStock ? "var(--olea-gray-200)" : "var(--olea-green-900)",
            color: isOutOfStock ? "var(--fg-2)" : "#fff",
            fontWeight: 600, fontSize: 13,
            cursor: isOutOfStock ? "not-allowed" : "pointer",
            transition: "background 200ms", fontFamily: "var(--font-sans)",
          }}
          className={isOutOfStock ? "" : "pc-btn"}
        >
          <ShoppingCart size={14} />
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </Link>
  );
}
