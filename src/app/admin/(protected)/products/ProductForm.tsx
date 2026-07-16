"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Upload, X, Plus, Loader2, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import type { ProductRow } from "@/types/database";

// Image uploads go directly to Supabase Storage (public bucket, anon key is fine).
// Product create/update/delete go through API routes so the service role key stays server-side.

const CATEGORIES = [
  { value: "inverters",          label: "Inverters" },
  { value: "solar_panels",       label: "Solar Panels" },
  { value: "batteries",          label: "Batteries" },
  { value: "systems",            label: "Complete Systems" },
  { value: "charge_controllers", label: "Charge Controllers" },
  { value: "accessories",        label: "Accessories" },
];

interface Props {
  product?: ProductRow;
  mode: "create" | "edit";
}

export default function ProductForm({ product, mode }: Props) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);

  const [name, setName]                   = useState(product?.name ?? "");
  const [slug, setSlug]                   = useState(product?.slug ?? "");
  const [category, setCategory]           = useState(product?.category ?? "inverters");
  const [price, setPrice]                 = useState(product?.price?.toString() ?? "");
  const [compareAtPrice, setCompareAtPrice] = useState(product?.compare_at_price?.toString() ?? "");
  const [shortDescription, setShortDesc]  = useState(product?.short_description ?? "");
  const [description, setDescription]     = useState(product?.description ?? "");
  const [stockQty, setStockQty]           = useState(product?.stock_quantity?.toString() ?? "0");
  const [lowStockThreshold, setLowThreshold] = useState(product?.low_stock_threshold?.toString() ?? "5");
  const [isActive, setIsActive]           = useState(product?.is_active ?? true);
  const [isFeatured, setIsFeatured]       = useState(product?.is_featured ?? false);
  const [images, setImages]               = useState<string[]>(product?.images ?? []);
  const [videoUrl, setVideoUrl]           = useState(product?.video_url ?? "");
  const [specs, setSpecs]                 = useState<{ key: string; value: string }[]>(
    Object.entries((product?.specifications as Record<string, string>) ?? {}).map(([key, value]) => ({ key, value }))
  );

  const [saving, setSaving]     = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError]       = useState("");

  function autoSlug(n: string) {
    return n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  async function uploadImage(file: File) {
    setUploadingImage(true);
    const ext  = file.name.split(".").pop();
    const path = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error: upErr } = await supabase.storage.from("product-media").upload(path, file, { upsert: true });
    if (upErr) { setError("Image upload failed: " + upErr.message); setUploadingImage(false); return; }
    const { data } = supabase.storage.from("product-media").getPublicUrl(path);
    setImages((prev) => [...prev, data.publicUrl]);
    setUploadingImage(false);
  }

  async function handleSave() {
    if (!name || !price || !category) { setError("Name, price, and category are required."); return; }
    setSaving(true);
    setError("");

    const specsObj = specs.reduce<Record<string, string>>((acc, { key, value }) => {
      if (key.trim()) acc[key.trim()] = value.trim();
      return acc;
    }, {});

    const payload = {
      name: name.trim(),
      slug: slug.trim() || autoSlug(name),
      category,
      price: parseFloat(price),
      compare_at_price: compareAtPrice ? parseFloat(compareAtPrice) : null,
      short_description: shortDescription.trim() || null,
      description: description.trim() || null,
      stock_quantity: parseInt(stockQty) || 0,
      low_stock_threshold: parseInt(lowStockThreshold) || 5,
      is_active: isActive,
      is_featured: isFeatured,
      images,
      video_url: videoUrl.trim() || null,
      specifications: specsObj,
    };

    if (mode === "create") {
      const res = await fetch("/api/admin/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const json = await res.json();
      if (!res.ok) { setError(json.error ?? "Failed to create product"); setSaving(false); return; }
    } else {
      const res = await fetch(`/api/admin/products/${product!.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const json = await res.json();
      if (!res.ok) { setError(json.error ?? "Failed to update product"); setSaving(false); return; }
    }

    router.push("/admin/products");
    router.refresh();
  }

  async function handleDelete() {
    if (!product) return;
    if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    setDeleting(true);
    await fetch(`/api/admin/products/${product.id}`, { method: "DELETE" });
    router.push("/admin/products");
    router.refresh();
  }

  const inputStyle: React.CSSProperties = { width: "100%", padding: "11px 14px", border: "1.5px solid var(--border-subtle)", borderRadius: 10, fontSize: 14, fontFamily: "var(--font-sans)", color: "var(--olea-ink)", outline: "none", background: "#fff", boxSizing: "border-box" };
  const labelStyle: React.CSSProperties = { display: "block", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg-2)", marginBottom: 6 };

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "32px 36px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, color: "var(--olea-ink)", margin: 0 }}>
            {mode === "create" ? "Add New Product" : `Edit: ${product?.name}`}
          </h1>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {mode === "edit" && (
            <button onClick={handleDelete} disabled={deleting} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 18px", borderRadius: 10, border: "1.5px solid #e53e3e", background: "#fff", color: "#e53e3e", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "var(--font-sans)" }}>
              <Trash2 size={14} /> {deleting ? "Deleting…" : "Delete"}
            </button>
          )}
          <button onClick={handleSave} disabled={saving} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 22px", borderRadius: 10, border: "none", background: saving ? "var(--olea-gray-200)" : "var(--olea-green-900)", color: saving ? "var(--fg-2)" : "#fff", fontWeight: 700, fontSize: 14, cursor: saving ? "not-allowed" : "pointer", fontFamily: "var(--font-sans)" }}>
            {saving && <Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} />}
            {saving ? "Saving…" : mode === "create" ? "Create Product" : "Save Changes"}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ background: "rgba(229,62,62,0.08)", border: "1px solid rgba(229,62,62,0.25)", borderRadius: 8, padding: "12px 16px", marginBottom: 20, fontSize: 13, color: "#c53030" }}>
          {error}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, alignItems: "start" }}>
        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Basic info */}
          <div style={{ background: "#fff", borderRadius: 14, padding: 24, boxShadow: "var(--shadow-sm)", border: "1px solid var(--border-subtle)" }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--olea-ink)", margin: "0 0 18px" }}>Basic Information</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={labelStyle}>Product Name *</label>
                <input style={inputStyle} value={name} onChange={(e) => { setName(e.target.value); if (mode === "create") setSlug(autoSlug(e.target.value)); }} placeholder="e.g. 5KVA Hybrid Inverter" />
              </div>
              <div>
                <label style={labelStyle}>URL Slug *</label>
                <input style={inputStyle} value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="5kva-hybrid-inverter" />
              </div>
              <div>
                <label style={labelStyle}>Short Description</label>
                <input style={inputStyle} value={shortDescription} onChange={(e) => setShortDesc(e.target.value)} placeholder="One-line summary shown on product card" />
              </div>
              <div>
                <label style={labelStyle}>Full Description</label>
                <textarea style={{ ...inputStyle, height: 120, resize: "vertical" } as React.CSSProperties} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Detailed product description…" />
              </div>
            </div>
          </div>

          {/* Images */}
          <div style={{ background: "#fff", borderRadius: 14, padding: 24, boxShadow: "var(--shadow-sm)", border: "1px solid var(--border-subtle)" }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--olea-ink)", margin: "0 0 18px" }}>Images & Video</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 14 }}>
              {images.map((url, i) => (
                <div key={i} style={{ position: "relative", width: 90, height: 90, borderRadius: 10, overflow: "hidden", border: "2px solid var(--border-subtle)" }}>
                  <Image src={url} alt="" fill style={{ objectFit: "cover" }} />
                  <button onClick={() => setImages((prev) => prev.filter((_, j) => j !== i))} style={{ position: "absolute", top: 4, right: 4, background: "rgba(229,62,62,0.9)", border: "none", borderRadius: 9999, width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff" }}>
                    <X size={11} />
                  </button>
                  {i === 0 && <span style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(7,41,31,0.8)", color: "var(--accent)", fontSize: 9, fontWeight: 700, textAlign: "center", padding: "3px 0" }}>MAIN</span>}
                </div>
              ))}
              <button onClick={() => fileRef.current?.click()} disabled={uploadingImage} style={{ width: 90, height: 90, borderRadius: 10, border: "2px dashed var(--border-subtle)", background: "var(--olea-green-50)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, cursor: "pointer", color: "var(--fg-2)", fontSize: 11, fontWeight: 600 }}>
                {uploadingImage ? <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> : <><Upload size={18} /><span>Upload</span></>}
              </button>
              <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={(e) => { Array.from(e.target.files ?? []).forEach(uploadImage); e.target.value = ""; }} />
            </div>
            <div>
              <label style={labelStyle}>Video URL (YouTube / direct MP4)</label>
              <input style={inputStyle} value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://youtube.com/watch?v=..." />
            </div>
          </div>

          {/* Specifications */}
          <div style={{ background: "#fff", borderRadius: 14, padding: 24, boxShadow: "var(--shadow-sm)", border: "1px solid var(--border-subtle)" }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--olea-ink)", margin: "0 0 18px" }}>Specifications</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {specs.map((spec, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <input style={{ ...inputStyle, flex: 1 }} placeholder="e.g. Capacity" value={spec.key} onChange={(e) => setSpecs((prev) => prev.map((s, j) => j === i ? { ...s, key: e.target.value } : s))} />
                  <input style={{ ...inputStyle, flex: 1 }} placeholder="e.g. 5KVA" value={spec.value} onChange={(e) => setSpecs((prev) => prev.map((s, j) => j === i ? { ...s, value: e.target.value } : s))} />
                  <button onClick={() => setSpecs((prev) => prev.filter((_, j) => j !== i))} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--fg-2)", padding: 4, display: "flex" }}>
                    <X size={16} />
                  </button>
                </div>
              ))}
              <button onClick={() => setSpecs((prev) => [...prev, { key: "", value: "" }])} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--olea-green-700)", background: "transparent", border: "none", cursor: "pointer", fontFamily: "var(--font-sans)", fontWeight: 600, padding: "4px 0" }}>
                <Plus size={15} /> Add Specification
              </button>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Pricing */}
          <div style={{ background: "#fff", borderRadius: 14, padding: 24, boxShadow: "var(--shadow-sm)", border: "1px solid var(--border-subtle)" }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--olea-ink)", margin: "0 0 18px" }}>Pricing (₦)</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={labelStyle}>Selling Price *</label>
                <input style={inputStyle} type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="280000" />
              </div>
              <div>
                <label style={labelStyle}>Original / Compare-at Price</label>
                <input style={inputStyle} type="number" value={compareAtPrice} onChange={(e) => setCompareAtPrice(e.target.value)} placeholder="320000 (shows discount)" />
              </div>
            </div>
          </div>

          {/* Category */}
          <div style={{ background: "#fff", borderRadius: 14, padding: 24, boxShadow: "var(--shadow-sm)", border: "1px solid var(--border-subtle)" }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--olea-ink)", margin: "0 0 18px" }}>Category *</h2>
            <select style={{ ...inputStyle }} value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>

          {/* Inventory */}
          <div style={{ background: "#fff", borderRadius: 14, padding: 24, boxShadow: "var(--shadow-sm)", border: "1px solid var(--border-subtle)" }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--olea-ink)", margin: "0 0 18px" }}>Inventory</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={labelStyle}>Stock Quantity</label>
                <input style={inputStyle} type="number" min="0" value={stockQty} onChange={(e) => setStockQty(e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Low Stock Alert Threshold</label>
                <input style={inputStyle} type="number" min="1" value={lowStockThreshold} onChange={(e) => setLowThreshold(e.target.value)} placeholder="5" />
                <p style={{ fontSize: 11, color: "var(--fg-2)", marginTop: 5 }}>Show "low stock" warning when quantity falls to this number</p>
              </div>
            </div>
          </div>

          {/* Visibility */}
          <div style={{ background: "#fff", borderRadius: 14, padding: 24, boxShadow: "var(--shadow-sm)", border: "1px solid var(--border-subtle)" }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--olea-ink)", margin: "0 0 18px" }}>Visibility</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "Active (visible on store)", sub: "Customers can find and buy this product", value: isActive, set: setIsActive },
                { label: "Featured", sub: "Appears in the Featured Products section on homepage", value: isFeatured, set: setIsFeatured },
              ].map(({ label, sub, value, set }) => (
                <div key={label} onClick={() => set((v) => !v)} style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer", userSelect: "none" }}>
                  <div style={{ width: 44, height: 24, borderRadius: 9999, background: value ? "var(--olea-green-700)" : "var(--olea-gray-300)", position: "relative", flexShrink: 0, transition: "background 200ms", marginTop: 2 }}>
                    <div style={{ position: "absolute", top: 3, left: value ? 23 : 3, width: 18, height: 18, borderRadius: 9999, background: "#fff", transition: "left 200ms", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--olea-ink)" }}>{label}</div>
                    <div style={{ fontSize: 11, color: "var(--fg-2)", marginTop: 2 }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
