import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Truck, ShieldCheck, Wrench, ChevronRight, Zap, Sun, BatteryCharging, Home, SlidersVertical, type LucideIcon } from "lucide-react";
import { SEED_PRODUCTS, getProductBySlug } from "@/lib/products-data";
import { fetchProductBySlug, fetchAllActiveProducts } from "@/lib/supabase/products";
import { fetchApprovedReviews } from "@/lib/supabase/reviews";
import { formatPrice } from "@/lib/utils";
import ProductCard from "@/components/site/ProductCard";
import AddToCartButton from "./AddToCartButton";
import ProductGallery from "./ProductGallery";
import ReviewsSection from "./ReviewsSection";
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

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = (await fetchProductBySlug(slug)) ?? getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} | Olea Technologies`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = (await fetchProductBySlug(slug)) ?? getProductBySlug(slug);
  if (!product) notFound();

  const Icon = CATEGORY_ICONS[product.category] ?? Zap;

  const allProducts = await fetchAllActiveProducts();
  const pool = allProducts.length > 0 ? allProducts : SEED_PRODUCTS.filter((p) => p.isActive);
  const related = pool.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.isFeatured)
  ).slice(0, 4);

  const reviews = await fetchApprovedReviews(product.id);

  const isOutOfStock = product.stockQuantity === 0;
  const isLowStock   = !isOutOfStock && product.stockQuantity <= product.lowStockThreshold;
  const stockPct     = isLowStock ? Math.min((product.stockQuantity / product.lowStockThreshold) * 100, 100) : 100;

  const stockLabel =
    isOutOfStock
      ? { text: "Out of stock",                                     color: "#e53e3e", bg: "rgba(229,62,62,0.10)" }
      : isLowStock
      ? { text: `Low stock, only ${product.stockQuantity} left`,   color: "#a96f00", bg: "rgba(249,166,6,0.15)" }
      : { text: "In stock · Ready to ship",                         color: "#1d6b3f", bg: "rgba(56,161,105,0.12)" };

  const discount = product.compareAtPrice && product.compareAtPrice > product.price
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : null;

  const specs = Object.entries(product.specifications ?? {});

  return (
    <>
      {/* ── Breadcrumb ── */}
      <div style={{ background: "var(--olea-green-900)", paddingTop: 110, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="container">
          <nav style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "rgba(255,255,255,0.5)", paddingBottom: 16, flexWrap: "wrap" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.5)" }}>Home</Link>
            <ChevronRight size={14} />
            <Link href="/products" style={{ color: "rgba(255,255,255,0.5)" }}>Products</Link>
            <ChevronRight size={14} />
            <Link href="/products" style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>{CATEGORY_LABELS[product.category]}</Link>
            <ChevronRight size={14} />
            <span style={{ color: "#fff", fontWeight: 500 }}>{product.name}</span>
          </nav>
        </div>
      </div>

      {/* ── Main product section ── */}
      <section style={{ background: "#fff", padding: "40px 0 72px" }}>
        <div className="container">
          <div className="pd-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start" }}>

            {/* ── Gallery (client component, interactive) ── */}
            <ProductGallery
              category={product.category}
              productName={product.name}
              discount={discount}
              isFeatured={product.isFeatured ?? false}
            />

            {/* ── Info panel ── */}
            <div>
              {/* Category + name */}
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--olea-green-600)", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
                <Icon size={14} />
                {CATEGORY_LABELS[product.category]}
              </div>

              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(24px, 3vw, 38px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 10px", color: "var(--olea-ink)" }}>
                {product.name}
              </h1>

              <p style={{ fontSize: 15.5, color: "var(--fg-2)", margin: "0 0 16px", lineHeight: 1.55 }}>
                {product.shortDescription}
              </p>

              {/* Rating */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                <span style={{ color: "var(--accent)", fontSize: 16, letterSpacing: 2 }}>
                  {"★".repeat(product.rating ?? 0)}{"☆".repeat(5 - (product.rating ?? 0))}
                </span>
                {product.reviewCount && (
                  <span style={{ fontSize: 13, color: "var(--fg-2)" }}>{product.reviewCount} verified reviews</span>
                )}
              </div>

              {/* Price block */}
              <div className="pd-price-block" style={{ background: "var(--olea-green-50)", borderRadius: 14, padding: "20px 22px", marginBottom: 22, border: "1px solid var(--olea-green-100)" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap", marginBottom: discount ? 10 : 0 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(28px, 4vw, 36px)", color: "var(--olea-ink)", fontVariantNumeric: "tabular-nums" }}>
                    {formatPrice(product.price)}
                  </span>
                  {product.compareAtPrice && (
                    <>
                      <span style={{ fontSize: 18, color: "var(--fg-2)", textDecoration: "line-through", fontVariantNumeric: "tabular-nums" }}>
                        {formatPrice(product.compareAtPrice)}
                      </span>
                      <span style={{ background: "#e53e3e", color: "#fff", fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 4 }}>
                        Save {formatPrice(product.compareAtPrice - product.price)}
                      </span>
                    </>
                  )}
                </div>

                {/* Stock status */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ background: stockLabel.bg, color: stockLabel.color, fontSize: 12, fontWeight: 700, letterSpacing: "0.04em", padding: "4px 12px", borderRadius: 4 }}>
                    {stockLabel.text}
                  </span>
                </div>

                {/* Low-stock bar */}
                {isLowStock && (
                  <div style={{ marginTop: 12 }}>
                    <div style={{ height: 5, borderRadius: 3, background: "var(--olea-gray-200)", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${stockPct}%`, background: "#e53e3e", borderRadius: 3 }} />
                    </div>
                    <div style={{ fontSize: 11, color: "#b53030", fontWeight: 600, marginTop: 5 }}>
                      Hurry, only {product.stockQuantity} units remaining
                    </div>
                  </div>
                )}
              </div>

              {/* Full description */}
              <p style={{ fontSize: 15, lineHeight: 1.72, color: "var(--fg-1)", margin: "0 0 26px" }}>
                {product.description}
              </p>

              {/* Add to cart + consult */}
              <AddToCartButton product={product} />
              <Link href="/contact" className="btn btn-outline-dark" style={{ width: "100%", justifyContent: "center", marginBottom: 24, marginTop: 12, boxSizing: "border-box" }}>
                Not sure this fits your setup? Talk to an engineer →
              </Link>

              {/* Trust badges */}
              <div className="pd-trust-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, paddingTop: 22, borderTop: "1px solid var(--border-subtle)" }}>
                {[
                  { icon: Truck,       label: "Nationwide", sub: "Delivery" },
                  { icon: ShieldCheck, label: "Genuine",    sub: "Warranty" },
                  { icon: Wrench,      label: "Install",    sub: "Available" },
                ].map(({ icon: TIcon, label, sub }) => (
                  <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "14px 8px", borderRadius: 10, background: "var(--olea-green-50)", textAlign: "center" }}>
                    <TIcon size={20} style={{ color: "var(--olea-green-700)" }} />
                    <div style={{ fontSize: 12, fontWeight: 700, color: "var(--olea-ink)", lineHeight: 1.2 }}>{label}<br /><span style={{ fontWeight: 400, color: "var(--fg-2)" }}>{sub}</span></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Specifications ── */}
      {specs.length > 0 && (
        <section style={{ background: "var(--bg-page)", padding: "72px 0" }}>
          <div className="container-narrow">
            <div className="specs-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 56, alignItems: "start" }}>
              <div>
                <span className="eyebrow">Technical Detail</span>
                <h2 className="headline-section">Specifications</h2>
                <p style={{ fontSize: 15, color: "var(--fg-2)", lineHeight: 1.65, marginBottom: 24 }}>
                  Every component is tested, certified, and warrantied. Ask us anything about compatibility with your existing setup.
                </p>
                <Link href="/contact" className="btn btn-green" style={{ display: "inline-flex" }}>
                  Ask a technical question →
                </Link>
              </div>
              <div style={{ background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <tbody>
                    {specs.map(([key, val], i) => (
                      <tr key={key} style={{ background: i % 2 === 0 ? "#fff" : "var(--olea-green-50)", borderBottom: "1px solid var(--border-subtle)" }}>
                        <td style={{ padding: "13px 20px", fontSize: 14, color: "var(--fg-2)", width: "45%", fontWeight: 500 }}>{key}</td>
                        <td style={{ padding: "13px 20px", fontSize: 14, fontWeight: 700, color: "var(--olea-ink)" }}>{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Reviews ── */}
      <ReviewsSection productId={product.id} reviews={reviews} />

      {/* ── Related products ── */}
      {related.length > 0 && (
        <section style={{ background: "#fff", padding: "72px 0" }}>
          <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(22px, 3vw, 30px)", margin: 0, color: "var(--olea-ink)" }}>
                You might also need
              </h2>
              <Link href="/products" style={{ color: "var(--accent-hover)", fontWeight: 600, fontSize: 14 }}>
                All products →
              </Link>
            </div>
            <div className="related-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              {related.map((p) => (
                <ProductCard key={p.id} product={p} compact />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <div style={{ background: "var(--accent)", padding: "72px 0" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(24px, 3.5vw, 40px)", lineHeight: 1.08, margin: "0 0 12px", color: "var(--olea-green-900)" }}>
              Want it installed, not just delivered?
            </h2>
            <p style={{ fontSize: 16, color: "var(--olea-green-800)", margin: 0, maxWidth: 620, lineHeight: 1.65 }}>
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
          .pd-grid      { grid-template-columns: 1fr !important; gap: 32px !important; }
          .specs-grid   { grid-template-columns: 1fr !important; }
          .related-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 540px) {
          .related-grid  { grid-template-columns: 1fr 1fr !important; gap: 12px !important; }
          .pd-price-block { padding: 16px 14px !important; }
          .pd-trust-grid  { gap: 8px !important; }
        }
      `}</style>
    </>
  );
}
