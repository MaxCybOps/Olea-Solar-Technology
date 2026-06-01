"use client";

import Link from "next/link";
import { ShoppingCart, Zap, Sun, BatteryCharging, Home, SlidersVertical, Factory, Wrench, type LucideIcon } from "lucide-react";
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

  const stockBadge =
    p.stockQuantity === 0
      ? { label: "Out of stock", color: "#e53e3e", bg: "rgba(229,62,62,0.10)" }
      : p.stockQuantity <= p.lowStockThreshold
      ? { label: `Only ${p.stockQuantity} left`, color: "#a96f00", bg: "rgba(249,166,6,0.15)" }
      : { label: "In stock", color: "#1d6b3f", bg: "rgba(56,161,105,0.12)" };

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    if (p.stockQuantity === 0) return;
    addItem({
      productId: p.id,
      name: p.name,
      price: p.price,
      quantity: 1,
      slug: p.slug,
    });
  }

  return (
    <Link
      href={`/products/${p.slug}`}
      className="card card-hoverable"
      style={{ overflow: "hidden", display: "flex", flexDirection: "column", textDecoration: "none", opacity: p.stockQuantity === 0 ? 0.8 : 1 }}
    >
      {/* Image / icon area */}
      <div style={{ position: "relative", aspectRatio: compact ? "4/3" : "16/10", overflow: "hidden", background: "linear-gradient(135deg, var(--olea-green-700), var(--olea-green-900))", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 60% 40%, rgba(249,166,6,0.18) 0%, transparent 60%)" }} />
        <span style={{ position: "relative" }}><Icon size={compact ? 48 : 64} style={{ color: "rgba(249,166,6,0.7)" }} /></span>
        {p.isFeatured && (
          <span style={{ position: "absolute", top: 12, left: 12, background: "var(--accent)", color: "var(--olea-ink)", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 4 }}>
            Featured
          </span>
        )}
        <span style={{ position: "absolute", top: 12, right: 12, background: stockBadge.bg, color: stockBadge.color, fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 4 }}>
          {stockBadge.label}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: compact ? "16px 18px 18px" : "20px 22px 22px", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent-hover)", marginBottom: 6 }}>
          {CATEGORY_LABELS[p.category] ?? p.category}
        </div>
        <h3 style={{ fontWeight: 700, fontSize: compact ? 15 : 17, lineHeight: 1.3, margin: "0 0 6px", color: "var(--olea-ink)" }}>
          {p.name}
        </h3>
        <p style={{ fontSize: 13, color: "var(--fg-2)", margin: "0 0 14px", lineHeight: 1.4 }}>
          {p.shortDescription}
        </p>

        {/* Rating */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
          <span style={{ color: "var(--accent)", fontSize: 13, letterSpacing: 1 }}>
            {"★".repeat(p.rating ?? 0)}{"☆".repeat(5 - (p.rating ?? 0))}
          </span>
          {p.reviewCount && (
            <span style={{ fontSize: 12, color: "var(--fg-2)" }}>({p.reviewCount})</span>
          )}
        </div>

        {/* Price row */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: "auto", marginBottom: 16 }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: compact ? 18 : 22, color: "var(--olea-ink)", fontVariantNumeric: "tabular-nums" }}>
            {formatPrice(p.price)}
          </span>
          {p.compareAtPrice && (
            <span style={{ fontSize: 14, color: "var(--fg-2)", textDecoration: "line-through" }}>
              {formatPrice(p.compareAtPrice)}
            </span>
          )}
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAddToCart}
          disabled={p.stockQuantity === 0}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            width: "100%",
            padding: "11px 16px",
            borderRadius: 9999,
            border: "none",
            background: p.stockQuantity === 0 ? "var(--olea-gray-200)" : "var(--accent)",
            color: p.stockQuantity === 0 ? "var(--fg-2)" : "var(--olea-ink)",
            fontWeight: 600,
            fontSize: 14,
            cursor: p.stockQuantity === 0 ? "not-allowed" : "pointer",
            transition: "var(--t-base)",
            fontFamily: "var(--font-sans)",
          }}
        >
          <ShoppingCart size={16} />
          {p.stockQuantity === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </Link>
  );
}
