"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/site/ProductCard";
import { SEED_PRODUCTS } from "@/lib/products-data";
import type { ProductCategory } from "@/types";

const CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: "solar_panels", label: "Solar Panels" },
  { value: "inverters", label: "Inverters" },
  { value: "batteries", label: "Batteries" },
  { value: "charge_controllers", label: "Charge Controllers" },
  { value: "accessories", label: "Accessories" },
  { value: "systems", label: "Complete Systems" },
];

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "name", label: "Name A–Z" },
  { value: "rating", label: "Top Rated" },
];

const MAX_PRICE = 2000000;

export default function ProductsPage() {
  const [selectedCats, setSelectedCats] = useState<Set<ProductCategory>>(new Set());
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [priceMax, setPriceMax] = useState(MAX_PRICE);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggleCat = (cat: ProductCategory) => {
    setSelectedCats((prev) => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let list = SEED_PRODUCTS.filter((p) => {
      if (!p.isActive) return false;
      if (selectedCats.size && !selectedCats.has(p.category)) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.shortDescription.toLowerCase().includes(search.toLowerCase())) return false;
      if (p.price > priceMax) return false;
      if (inStockOnly && p.stockQuantity === 0) return false;
      return true;
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "rating") list = [...list].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    else list = [...list].sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    return list;
  }, [selectedCats, search, sort, priceMax, inStockOnly]);

  const hasActiveFilters = selectedCats.size > 0 || priceMax < MAX_PRICE || inStockOnly;

  const clearFilters = () => {
    setSelectedCats(new Set());
    setPriceMax(MAX_PRICE);
    setInStockOnly(false);
  };

  const Sidebar = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Category */}
      <div style={{ background: "#fff", borderRadius: 12, padding: 22, boxShadow: "var(--shadow-sm)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--olea-ink)", marginBottom: 14 }}>
          Category
        </div>
        {CATEGORIES.map((c) => {
          const count = SEED_PRODUCTS.filter((p) => p.category === c.value && p.isActive).length;
          const on = selectedCats.has(c.value);
          return (
            <div
              key={c.value}
              onClick={() => toggleCat(c.value)}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", fontSize: 14, cursor: "pointer", color: "var(--fg-1)", userSelect: "none" }}
            >
              <span style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${on ? "var(--brand)" : "var(--olea-gray-400)"}`, background: on ? "var(--brand)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "var(--t-base)" }}>
                {on && <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              </span>
              <span style={{ flex: 1 }}>{c.label}</span>
              <span style={{ fontSize: 12, color: "var(--fg-2)" }}>{count}</span>
            </div>
          );
        })}
      </div>

      {/* Price range */}
      <div style={{ background: "#fff", borderRadius: 12, padding: 22, boxShadow: "var(--shadow-sm)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--olea-ink)", marginBottom: 14 }}>
          Max Price · ₦{priceMax.toLocaleString()}
        </div>
        <input
          type="range"
          min={35000}
          max={MAX_PRICE}
          step={50000}
          value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
          style={{ width: "100%", accentColor: "var(--brand)" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--fg-2)", marginTop: 6 }}>
          <span>₦35k</span>
          <span>₦2M</span>
        </div>
      </div>

      {/* Availability */}
      <div style={{ background: "#fff", borderRadius: 12, padding: 22, boxShadow: "var(--shadow-sm)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--olea-ink)", marginBottom: 14 }}>
          Availability
        </div>
        <div
          onClick={() => setInStockOnly((v) => !v)}
          style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, cursor: "pointer", userSelect: "none" }}
        >
          <span style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${inStockOnly ? "var(--brand)" : "var(--olea-gray-400)"}`, background: inStockOnly ? "var(--brand)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "var(--t-base)" }}>
            {inStockOnly && <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
          </span>
          In stock only
        </div>
      </div>

      {/* Clear filters */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          style={{ background: "transparent", border: "1.5px solid var(--olea-gray-200)", borderRadius: 9999, padding: "10px 16px", fontSize: 13, color: "var(--fg-2)", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, justifyContent: "center", fontFamily: "var(--font-sans)" }}
        >
          <X size={14} /> Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Hero */}
      <section style={{ position: "relative", background: "var(--olea-green-900)", color: "#fff", paddingTop: 148, paddingBottom: 80, overflow: "hidden", minHeight: 440 }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src="/images/products-hero.jpg"
            alt=""
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(7,41,31,0.90) 0%, rgba(7,41,31,0.65) 100%)" }} />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <nav style={{ fontSize: 13, color: "rgba(255,255,255,0.48)", marginBottom: 28 }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.48)" }}>Home</Link>
            <span style={{ margin: "0 8px" }}>›</span>
            <span>Shop</span>
          </nav>
          <span className="eyebrow">Shop</span>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 1.0, letterSpacing: "-0.03em", margin: "0 0 14px", color: "#fff" }}>
            Equipment built for<br />
            <span style={{ color: "var(--accent)" }}>African conditions.</span>
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.70)", maxWidth: 560, margin: 0, lineHeight: 1.6 }}>
            Inverters, panels, batteries, and complete systems. Vetted brands. Real warranties. Installed by Olea engineers.
          </p>
        </div>
      </section>

      {/* Body */}
      <div style={{ padding: "48px 0 96px", background: "var(--bg-page)" }}>
        <div className="container">
          <div className="products-layout" style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 40, alignItems: "start" }}>

            {/* Sidebar — desktop */}
            <aside className="products-sidebar" style={{ position: "sticky", top: 100, alignSelf: "flex-start" }}>
              <Sidebar />
            </aside>

            {/* Main */}
            <div>
              {/* Toolbar */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
                {/* Search */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#fff", border: "1px solid var(--border-subtle)", borderRadius: 9999, padding: "10px 18px", flex: 1, minWidth: 200, boxShadow: "var(--shadow-sm)" }}>
                  <Search size={16} style={{ color: "var(--fg-2)" }} />
                  <input
                    type="text"
                    placeholder="Search products…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ flex: 1, border: "none", outline: "none", fontSize: 14, fontFamily: "var(--font-sans)", background: "transparent", color: "var(--olea-ink)" }}
                  />
                  {search && (
                    <button onClick={() => setSearch("")} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--fg-2)", padding: 0, display: "flex" }}>
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Mobile filter toggle */}
                <button
                  className="products-filter-btn"
                  onClick={() => setMobileFiltersOpen(true)}
                  style={{ display: "none", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 9999, border: "1.5px solid var(--border-subtle)", background: "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "var(--font-sans)", color: "var(--olea-ink)" }}
                >
                  <SlidersHorizontal size={16} /> Filters {hasActiveFilters && <span style={{ background: "var(--accent)", color: "var(--olea-ink)", borderRadius: 9999, width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>{selectedCats.size + (inStockOnly ? 1 : 0)}</span>}
                </button>

                {/* Sort */}
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  style={{ background: "#fff", border: "1.5px solid var(--border-subtle)", borderRadius: 9999, padding: "10px 18px", fontSize: 14, fontFamily: "var(--font-sans)", color: "var(--olea-ink)", cursor: "pointer", boxShadow: "var(--shadow-sm)" }}
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              {/* Results count */}
              <div style={{ fontSize: 13, color: "var(--fg-2)", marginBottom: 20 }}>
                Showing <strong style={{ color: "var(--olea-ink)" }}>{filtered.length}</strong> of {SEED_PRODUCTS.filter(p => p.isActive).length} products
                {hasActiveFilters && (
                  <button onClick={clearFilters} style={{ marginLeft: 10, color: "var(--accent-hover)", background: "transparent", border: "none", cursor: "pointer", fontSize: 13, fontFamily: "var(--font-sans)", fontWeight: 600 }}>
                    Clear filters ×
                  </button>
                )}
              </div>

              {/* Grid */}
              {filtered.length > 0 ? (
                <div className="products-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
                  {filtered.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              ) : (
                <div style={{ padding: "80px 40px", textAlign: "center", background: "#fff", borderRadius: 16, boxShadow: "var(--shadow-sm)" }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                  <h3 style={{ fontWeight: 600, fontSize: 20, color: "var(--olea-ink)", margin: "0 0 8px" }}>No products match your filters</h3>
                  <p style={{ color: "var(--fg-2)", marginBottom: 20 }}>Try adjusting your search or filters to find what you need.</p>
                  <button onClick={clearFilters} className="btn btn-primary">Clear all filters</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile filters drawer */}
      {mobileFiltersOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(7,41,31,0.6)", backdropFilter: "blur(4px)" }} onClick={() => setMobileFiltersOpen(false)}>
          <div
            style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "var(--bg-page)", borderRadius: "20px 20px 0 0", padding: "24px 20px 40px", maxHeight: "85vh", overflowY: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <span style={{ fontWeight: 700, fontSize: 18, color: "var(--olea-ink)" }}>Filters</span>
              <button onClick={() => setMobileFiltersOpen(false)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--olea-ink)" }}>
                <X size={24} />
              </button>
            </div>
            <Sidebar />
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1200px) {
          .products-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 900px) {
          .products-layout     { grid-template-columns: 1fr !important; }
          .products-sidebar    { display: none !important; }
          .products-filter-btn { display: flex !important; }
          .products-grid       { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 540px) {
          .products-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 380px) {
          .products-grid { grid-template-columns: 1fr !important; }
        }
        .card-hoverable:hover .product-card-img { transform: scale(1.06); }
      `}</style>
    </>
  );
}
