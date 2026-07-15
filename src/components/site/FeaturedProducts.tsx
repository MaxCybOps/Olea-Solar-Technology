"use client";

import { useRef, useState, useEffect, type RefObject } from "react";
import Link from "next/link";
import {
  Zap, Sun, BatteryCharging, Home, Cpu, Wrench,
  ChevronLeft, ChevronRight, type LucideIcon,
} from "lucide-react";
import { SEED_PRODUCTS } from "@/lib/products-data";
import { supabase } from "@/lib/supabase/client";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

const ICONS: Record<string, LucideIcon> = {
  inverters:          Zap,
  solar_panels:       Sun,
  batteries:          BatteryCharging,
  systems:            Home,
  charge_controllers: Cpu,
  accessories:        Wrench,
};

const CAT: Record<string, string> = {
  inverters:          "Inverters",
  solar_panels:       "Solar Panels",
  batteries:          "Batteries",
  systems:            "Systems",
  charge_controllers: "Charge Controllers",
  accessories:        "Accessories",
};

/* ── Single card — no ScrollFade wrapper so width/height work correctly ── */
function ProductCard({ p, showDesc }: { p: Product; showDesc?: boolean }) {
  const Icon = ICONS[p.category] ?? Zap;
  const inStock = p.stockQuantity > 0;
  return (
    <Link
      href={`/products/${p.slug}`}
      className="card card-hoverable fp-card"
      style={{ textDecoration: "none", display: "flex", flexDirection: "column" }}
    >
      {/* Image zone */}
      <div
        className="fp-card-img"
        style={{
          background: "linear-gradient(135deg, var(--olea-green-700), var(--olea-green-900))",
          position: "relative", display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden", flexShrink: 0, borderRadius: "12px 12px 0 0",
        }}
      >
        <div style={{ position: "absolute", inset: "-40%", background: "radial-gradient(circle, rgba(249,166,6,0.14) 0%, transparent 60%)" }} />
        <Icon className="fp-card-icon" style={{ color: "rgba(249,166,6,0.65)", position: "relative" }} />
        {p.isFeatured && <span className="fp-badge">Featured</span>}
      </div>

      {/* Body — flex:1 so price/button always align to bottom */}
      <div style={{ padding: "12px 14px 14px", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--fg-2)", marginBottom: 4 }}>
          {CAT[p.category] ?? p.category}
        </div>

        {/* Name: clamped to 2 lines with min-height so all cards stay same height */}
        <h5 className="fp-card-name">
          {p.name}
        </h5>

        {/* Description: row 2 only, hidden on mobile via CSS */}
        {showDesc && (
          <p className="fp-card-desc">
            {p.shortDescription}
          </p>
        )}

        {/* Price row: margin-top: auto pushes it to bottom of flex body */}
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 4, marginTop: "auto", marginBottom: 10 }}>
          <div>
            <span style={{ fontWeight: 700, fontSize: 14, color: "var(--olea-ink)", fontVariantNumeric: "tabular-nums" }}>
              {formatPrice(p.price)}
            </span>
            {p.compareAtPrice && (
              <span style={{ fontSize: 11, color: "var(--fg-2)", textDecoration: "line-through", marginLeft: 4 }}>
                {formatPrice(p.compareAtPrice)}
              </span>
            )}
          </div>
          <span style={{ color: "var(--accent)", fontSize: 10 }}>{"★".repeat(p.rating ?? 5)}</span>
        </div>

        <span style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: "100%", padding: "8px", border: "none",
          background: inStock ? "var(--accent)" : "var(--olea-gray-200)",
          color: inStock ? "var(--olea-ink)" : "var(--fg-2)",
          fontWeight: 600, fontSize: 11.5, letterSpacing: "0.02em",
          borderRadius: 7, transition: "var(--t-base)", flexShrink: 0,
        }}>
          {inStock ? "View & Buy →" : "Out of Stock"}
        </span>
      </div>
    </Link>
  );
}

/* ── Scroll rail with arrow buttons ── */
function ScrollRail({
  label, sub, products, showDesc, railRef,
}: {
  label: string; sub: string;
  products: Product[];
  showDesc?: boolean;
  railRef: RefObject<HTMLDivElement | null>;
}) {
  const scroll = (dir: "left" | "right") => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector(".fp-card") as HTMLElement;
    const step = card ? card.offsetWidth + 14 : 290;
    el.scrollBy({ left: dir === "right" ? step : -step, behavior: "smooth" });
  };

  return (
    <div style={{ marginTop: 36 }}>
      <div className="fp-rail-head">
        <div>
          <span className="eyebrow" style={{ marginBottom: 3 }}>{label}</span>
          <h3 className="fp-rail-title">{sub}</h3>
        </div>
        <div className="fp-arrows">
          {(["left", "right"] as const).map((dir) => (
            <button key={dir} onClick={() => scroll(dir)} aria-label={`Scroll ${dir}`} className="fp-arrow-btn">
              {dir === "left" ? <ChevronLeft size={17} /> : <ChevronRight size={17} />}
            </button>
          ))}
        </div>
      </div>

      {/* Cards are direct children of rail — no ScrollFade wrapper so widths/heights resolve correctly */}
      <div ref={railRef} className="fp-rail">
        {products.map((p) => (
          <ProductCard key={p.id} p={p} showDesc={showDesc} />
        ))}
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  const rail1 = useRef<HTMLDivElement>(null);
  const rail2 = useRef<HTMLDivElement>(null);

  const seedActive = SEED_PRODUCTS.filter((p) => p.isActive);
  const [allProducts, setAllProducts] = useState<Product[]>(seedActive);

  useEffect(() => {
    supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("is_featured", { ascending: false })
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (!data || data.length === 0) return;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setAllProducts((data as any[]).map((r): Product => ({
          id: r.id, name: r.name, slug: r.slug,
          description: r.description ?? "", shortDescription: r.short_description ?? "",
          price: r.price, compareAtPrice: r.compare_at_price ?? undefined,
          stockQuantity: r.stock_quantity, lowStockThreshold: r.low_stock_threshold,
          category: r.category, images: r.images ?? [],
          specifications: r.specifications ?? {}, isActive: r.is_active,
          isFeatured: r.is_featured, requiresInstallation: false,
          rating: r.rating ?? undefined, reviewCount: r.review_count ?? undefined,
          createdAt: new Date(r.created_at), updatedAt: new Date(r.updated_at),
        })));
      });
  }, []);

  const row1 = [
    ...allProducts.filter((p) => p.isFeatured),
    ...allProducts.filter((p) => !p.isFeatured),
  ].slice(0, 8);
  const row2 = allProducts;

  return (
    <section className="section section-white">
      <div className="container">

        <div className="fp-header">
          <div>
            <span className="eyebrow">Shop</span>
            <h2 className="headline-section" style={{ marginBottom: 6 }}>Our equipment.</h2>
            <p className="lead">Inverters, panels, batteries and complete systems for every need.</p>
          </div>
          <Link href="/products" className="btn btn-outline-dark fp-see-all">
            See All Products →
          </Link>
        </div>

        <ScrollRail label="Featured"     sub="Best-selling equipment."   products={row1} showDesc={false} railRef={rail1} />
        <ScrollRail label="Browse More"  sub="More from our catalogue."  products={row2} showDesc={true}  railRef={rail2} />

      </div>

      <style>{`
        /* ── Header ── */
        .fp-header {
          display: flex; justify-content: space-between;
          align-items: flex-end; gap: 20px; flex-wrap: wrap;
          margin-bottom: 4px;
        }

        /* ── Rail header row ── */
        .fp-rail-head {
          display: flex; justify-content: space-between;
          align-items: center; gap: 16px; margin-bottom: 16px;
        }
        .fp-rail-title {
          font-family: var(--font-sans); font-weight: 600;
          font-size: clamp(15px,1.6vw,19px); margin: 0;
          color: var(--olea-ink); letter-spacing: -0.01em;
        }

        /* ── Scroll track ── */
        .fp-rail {
          display: flex;
          align-items: stretch;        /* equalise all card heights to tallest card */
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          gap: 14px;
          padding-bottom: 4px;
          cursor: grab;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .fp-rail:active           { cursor: grabbing; }
        .fp-rail::-webkit-scrollbar { display: none; }

        /* ── Product card ──
           Fixed pixel widths (not % — percentages inside a flex scroll container
           reference the wrapper's undefined width, not the visible track width).
           Desktop: 290px × 4 ≈ fills a 1240px container with 3 × 14px gaps.
        ── */
        .fp-card {
          flex-shrink: 0;
          scroll-snap-align: start;
          overflow: hidden;
          width: 290px;
          min-width: 290px;
        }

        /* Name: always 2-line height so short names don't cause unequal cards */
        .fp-card-name {
          font-weight: 600;
          font-size: 13.5px;
          line-height: 1.3;
          margin: 0 0 5px;
          color: var(--olea-ink);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 35px; /* 2 lines × 13.5px × 1.3 */
        }

        /* Description: row 2 desktop only */
        .fp-card-desc {
          font-size: 11.5px;
          color: var(--fg-2);
          line-height: 1.45;
          margin: 0 0 10px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 34px; /* 2 lines × 11.5px × 1.45 */
        }

        .fp-card-img  { height: 140px; }
        .fp-card-icon { width: 44px; height: 44px; }
        .fp-badge {
          position: absolute; top: 10px; left: 10px;
          background: var(--accent); color: var(--olea-ink);
          font-size: 9px; font-weight: 700; letter-spacing: 0.08em;
          text-transform: uppercase; padding: 2px 8px; border-radius: 4px;
        }

        /* ── Arrow buttons (desktop) ── */
        .fp-arrows { display: flex; gap: 10px; }
        .fp-arrow-btn {
          width: 36px; height: 36px; border-radius: 9999px;
          border: 1.5px solid var(--olea-gray-200); background: #fff;
          cursor: pointer; display: flex; align-items: center;
          justify-content: center; transition: var(--t-base); color: var(--olea-ink);
          flex-shrink: 0;
        }
        .fp-arrow-btn:hover { border-color: var(--accent); background: var(--accent); }

        /* ── Tablet 768–1023px: ~3 visible, swipe only ── */
        @media (max-width: 1023px) {
          .fp-card { width: 220px; min-width: 220px; }
          .fp-arrows  { display: none; }
          .fp-see-all { display: none; }
        }

        /* ── Mobile 480–767px: compact, NO description ── */
        @media (max-width: 767px) {
          .fp-header    { margin-bottom: 0; }
          .fp-rail      { gap: 10px; }
          .fp-card      { width: 160px; min-width: 160px; }
          .fp-card-img  { height: 108px; }
          .fp-card-icon { width: 36px; height: 36px; }
          .fp-card-desc { display: none !important; }
          .fp-card-name { font-size: 12.5px; min-height: 33px; }
          .fp-rail-head { margin-bottom: 12px; }
          .fp-rail-title { font-size: 14px; }
        }

        /* ── Small mobile <480px ── */
        @media (max-width: 479px) {
          .fp-card      { width: 140px; min-width: 140px; }
          .fp-card-img  { height: 92px; }
          .fp-card-icon { width: 30px; height: 30px; }
          .fp-card-name { font-size: 12px; }
        }
      `}</style>
    </section>
  );
}
