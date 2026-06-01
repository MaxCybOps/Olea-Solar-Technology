import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Truck, ShieldCheck, Wrench, ChevronRight, Zap, Sun, BatteryCharging, Home, SlidersVertical, type LucideIcon } from "lucide-react";
import { SEED_PRODUCTS, getProductBySlug } from "@/lib/products-data";
import { formatPrice } from "@/lib/utils";
import ProductCard from "@/components/site/ProductCard";
import AddToCartButton from "./AddToCartButton";
import type { ProductCategory } from "@/types";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  inverters: Zap,
  solar_panels: Sun,
  batteries: BatteryCharging,
  systems: Home,
  charge_controllers: SlidersVertical,
  accessories: Wrench,
};

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  inverters: "Inverters",
  solar_panels: "Solar Panels",
  batteries: "Batteries",
  systems: "Complete Systems",
  charge_controllers: "Charge Controllers",
  accessories: "Accessories",
};

export async function generateStaticParams() {
  return SEED_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} — Olea Technologies`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const Icon = CATEGORY_ICONS[product.category] ?? Zap;

  const related = SEED_PRODUCTS.filter(
    (p) => p.isActive && p.id !== product.id && (p.category === product.category || p.isFeatured)
  ).slice(0, 4);

  const stockLabel =
    product.stockQuantity === 0
      ? { text: "Out of stock", color: "#e53e3e", bg: "rgba(229,62,62,0.10)" }
      : product.stockQuantity <= product.lowStockThreshold
      ? { text: `Low stock — only ${product.stockQuantity} left`, color: "#a96f00", bg: "rgba(249,166,6,0.15)" }
      : { text: "In stock", color: "#1d6b3f", bg: "rgba(56,161,105,0.12)" };

  const specs = Object.entries(product.specifications ?? {});

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ background: "var(--bg-page)", paddingTop: 110, paddingBottom: 0 }}>
        <div className="container">
          <nav style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--fg-2)", paddingBottom: 20, flexWrap: "wrap" }}>
            <Link href="/" style={{ color: "var(--fg-2)" }}>Home</Link>
            <ChevronRight size={14} />
            <Link href="/products" style={{ color: "var(--fg-2)" }}>Products</Link>
            <ChevronRight size={14} />
            <span style={{ color: "var(--fg-2)" }}>{CATEGORY_LABELS[product.category]}</span>
            <ChevronRight size={14} />
            <span style={{ color: "var(--olea-ink)", fontWeight: 500 }}>{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product section */}
      <section style={{ background: "var(--bg-page)", paddingBottom: 80 }}>
        <div className="container">
          <div className="pd-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start" }}>

            {/* Gallery */}
            <div style={{ position: "sticky", top: 100 }}>
              <div style={{ aspectRatio: "1/1", borderRadius: 20, background: "linear-gradient(135deg, var(--olea-green-700), var(--olea-green-900))", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", boxShadow: "var(--shadow-xl)" }}>
                <div style={{ position: "absolute", inset: "-30%", background: "radial-gradient(circle, rgba(249,166,6,0.20) 0%, transparent 60%)" }} />
                <span style={{ position: "relative" }}><Icon size={160} style={{ color: "rgba(249,166,6,0.65)" }} /></span>
                {product.isFeatured && (
                  <span style={{ position: "absolute", top: 20, left: 20, background: "var(--accent)", color: "var(--olea-ink)", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "5px 14px", borderRadius: 6 }}>
                    Featured
                  </span>
                )}
              </div>

              {/* Thumb row (decorative) */}
              <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
                {["Main", "Detail", "Box", "Cert"].map((label, i) => (
                  <div key={label} style={{ flex: 1, aspectRatio: "1/1", borderRadius: 10, background: i === 0 ? "var(--olea-green-100)" : "#fff", border: `2px solid ${i === 0 ? "var(--accent)" : "var(--border-subtle)"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ opacity: 0.6 }}><Icon size={22} style={{ color: "var(--olea-green-600)" }} /></span>
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent-hover)", marginBottom: 10 }}>
                {CATEGORY_LABELS[product.category]}
              </div>

              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(28px, 3.5vw, 40px)", lineHeight: 1.08, letterSpacing: "-0.02em", margin: "0 0 8px", color: "var(--olea-ink)" }}>
                {product.name}
              </h1>

              <p style={{ fontSize: 17, color: "var(--fg-2)", margin: "0 0 18px", lineHeight: 1.5 }}>
                {product.shortDescription}
              </p>

              {/* Rating + stock */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22, flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: "var(--accent)", fontSize: 15, letterSpacing: 1 }}>
                    {"★".repeat(product.rating ?? 0)}{"☆".repeat(5 - (product.rating ?? 0))}
                  </span>
                  {product.reviewCount && (
                    <span style={{ fontSize: 13, color: "var(--fg-2)" }}>({product.reviewCount} reviews)</span>
                  )}
                </div>
                <span style={{ background: stockLabel.bg, color: stockLabel.color, fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "4px 12px", borderRadius: 4 }}>
                  {stockLabel.text}
                </span>
              </div>

              {/* Price */}
              <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 22 }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 38, color: "var(--olea-ink)", fontVariantNumeric: "tabular-nums" }}>
                  {formatPrice(product.price)}
                </span>
                {product.compareAtPrice && (
                  <span style={{ fontSize: 20, color: "var(--fg-2)", textDecoration: "line-through" }}>
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
                {product.compareAtPrice && (
                  <span style={{ background: "rgba(249,166,6,0.15)", color: "var(--olea-gold-700)", fontSize: 13, fontWeight: 700, padding: "3px 10px", borderRadius: 4 }}>
                    Save {formatPrice(product.compareAtPrice - product.price)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "var(--fg-1)", margin: "0 0 26px" }}>
                {product.description}
              </p>

              {/* Add to cart */}
              <AddToCartButton product={product} />

              {/* Consult CTA */}
              <Link href="/contact" className="btn btn-outline-dark" style={{ width: "100%", justifyContent: "center", marginBottom: 22 }}>
                Not sure? Talk to an expert →
              </Link>

              {/* Trust badges */}
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap", paddingTop: 22, borderTop: "1px solid var(--border-subtle)" }}>
                {[
                  { icon: Truck, label: "Nationwide delivery" },
                  { icon: ShieldCheck, label: "Genuine warranty" },
                  { icon: Wrench, label: "Install available" },
                ].map(({ icon: TrustIcon, label }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--fg-2)" }}>
                    <TrustIcon size={16} style={{ color: "var(--olea-green-600)" }} />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      {specs.length > 0 && (
        <section style={{ background: "#fff", padding: "72px 0" }}>
          <div className="container-narrow">
            <div className="specs-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 56, alignItems: "start" }}>
              <div>
                <span className="eyebrow">Technical Detail</span>
                <h2 className="headline-section">Specifications</h2>
                <p style={{ fontSize: 15.5, color: "var(--fg-2)", lineHeight: 1.6 }}>
                  Every component we sell is tested, certified, and warrantied. Ask us anything about compatibility with your existing setup.
                </p>
                <Link href="/contact" className="btn btn-green" style={{ marginTop: 24, display: "inline-flex" }}>
                  Ask a technical question →
                </Link>
              </div>
              <div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <tbody>
                    {specs.map(([key, val]) => (
                      <tr key={key} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                        <td style={{ padding: "13px 0", fontSize: 14, color: "var(--fg-2)", width: "45%" }}>{key}</td>
                        <td style={{ padding: "13px 0", fontSize: 14, fontWeight: 600, color: "var(--olea-ink)", textAlign: "right" }}>{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related products */}
      {related.length > 0 && (
        <section style={{ background: "var(--bg-page)", padding: "72px 0" }}>
          <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28, margin: 0, color: "var(--olea-ink)" }}>
                You might also need
              </h2>
              <Link href="/products" style={{ color: "var(--accent-hover)", fontWeight: 600, fontSize: 14 }}>
                All products →
              </Link>
            </div>
            <div className="related-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
              {related.map((p) => (
                <ProductCard key={p.id} product={p} compact />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <div style={{ background: "var(--accent)", padding: "72px 0" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(26px, 3.5vw, 42px)", lineHeight: 1.08, margin: "0 0 12px", color: "var(--olea-green-900)" }}>
              Want it installed, not just delivered?
            </h2>
            <p style={{ fontSize: 16, color: "var(--olea-green-800)", margin: 0, maxWidth: 520 }}>
              Our engineers can size, supply, and install a complete system around this product.
            </p>
          </div>
          <Link href="/contact" className="btn btn-green" style={{ flexShrink: 0, fontSize: 16, padding: "16px 30px" }}>
            Get a Free Assessment →
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .pd-grid      { grid-template-columns: 1fr !important; }
          .specs-grid   { grid-template-columns: 1fr !important; }
          .related-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 540px) {
          .related-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
