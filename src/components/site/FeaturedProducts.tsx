import Link from "next/link";
import { Zap, Sun, BatteryCharging, Home, type LucideIcon } from "lucide-react";
import { SEED_PRODUCTS } from "@/lib/products-data";
import { formatPrice } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  inverters: Zap,
  solar_panels: Sun,
  batteries: BatteryCharging,
  systems: Home,
};

const CATEGORY_LABELS: Record<string, string> = {
  inverters: "Inverters",
  solar_panels: "Solar Panels",
  batteries: "Batteries",
  systems: "Complete Systems",
};

export default function FeaturedProducts() {
  const featured = SEED_PRODUCTS.filter((p) => p.isFeatured && p.isActive).slice(0, 4);

  return (
    <section className="section section-white">
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, gap: 24, flexWrap: "wrap" }}>
          <div>
            <span className="eyebrow">Shop</span>
            <h2 className="headline-section" style={{ marginBottom: 8 }}>Featured equipment.</h2>
            <p className="lead">Hand-picked products our customers love most.</p>
          </div>
          <Link href="/products" className="btn btn-outline-dark" style={{ flexShrink: 0 }}>
            See All Products →
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }} className="fp-grid">
          {featured.map((p) => {
            const Icon = ICONS[p.category] ?? Zap;
            const stockOk = p.stockQuantity > 0;
            return (
              <Link
                key={p.id}
                href={`/products/${p.slug}`}
                className="card card-hoverable"
                style={{ overflow: "hidden", display: "flex", flexDirection: "column", textDecoration: "none" }}
              >
                {/* Image area */}
                <div style={{ aspectRatio: "4/3", background: "linear-gradient(135deg, var(--olea-green-700), var(--olea-green-900))", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: "-40%", background: "radial-gradient(circle, rgba(249,166,6,0.14) 0%, transparent 60%)" }} />
                  <Icon size={56} style={{ color: "rgba(249,166,6,0.65)", position: "relative" }} />
                  <div style={{ position: "absolute", top: 12, left: 12 }}>
                    <span style={{ background: "var(--accent)", color: "var(--olea-ink)", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 4 }}>Featured</span>
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: "18px 20px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-2)", marginBottom: 6 }}>
                    {CATEGORY_LABELS[p.category] ?? p.category}
                  </div>
                  <h5 style={{ fontWeight: 600, fontSize: 16, lineHeight: 1.3, margin: "0 0 4px", color: "var(--olea-ink)" }}>{p.name}</h5>
                  <p style={{ fontSize: 13, color: "var(--fg-2)", lineHeight: 1.4, margin: "0 0 14px" }}>{p.shortDescription}</p>

                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8, marginTop: "auto", marginBottom: 14 }}>
                    <div>
                      <span style={{ fontWeight: 700, fontSize: 19, color: "var(--olea-ink)", fontVariantNumeric: "tabular-nums" }}>{formatPrice(p.price)}</span>
                      {p.compareAtPrice && <span style={{ fontSize: 13, color: "var(--fg-2)", textDecoration: "line-through", marginLeft: 6 }}>{formatPrice(p.compareAtPrice)}</span>}
                    </div>
                    <span style={{ color: "var(--accent)", fontSize: 12 }}>{"★".repeat(p.rating ?? 5)}</span>
                  </div>

                  <span style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: "100%", padding: "11px", border: "none",
                    background: stockOk ? "var(--accent)" : "var(--olea-gray-200)",
                    color: stockOk ? "var(--olea-ink)" : "var(--fg-2)",
                    fontWeight: 600, fontSize: 13, letterSpacing: "0.04em",
                    borderRadius: 8, transition: "var(--t-base)",
                  }}>
                    {stockOk ? "Add to Cart" : "Out of Stock"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .fp-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 540px) { .fp-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
