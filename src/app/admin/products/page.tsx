import Link from "next/link";
import Image from "next/image";
import { Plus, Edit2, ToggleLeft, ToggleRight, PackageX } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { formatPrice } from "@/lib/utils";
import type { ProductRow } from "@/types/database";

const CATEGORY_LABELS: Record<string, string> = {
  inverters: "Inverters", solar_panels: "Solar Panels", batteries: "Batteries",
  systems: "Complete Systems", charge_controllers: "Charge Controllers", accessories: "Accessories",
};

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const { data: products, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) console.error("Products fetch error:", error);

  const rows = (products ?? []) as ProductRow[];
  const active   = rows.filter((p) => p.is_active).length;
  const outOfStock = rows.filter((p) => p.stock_quantity === 0).length;
  const lowStock   = rows.filter((p) => p.stock_quantity > 0 && p.stock_quantity <= p.low_stock_threshold).length;

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "32px 36px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, color: "var(--olea-ink)", margin: 0 }}>Products</h1>
          <p style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 4 }}>{rows.length} total · {active} active · {outOfStock} out of stock · {lowStock} low stock</p>
        </div>
        <Link href="/admin/products/new" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--olea-green-900)", color: "#fff", padding: "11px 20px", borderRadius: 10, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
          <Plus size={16} /> Add Product
        </Link>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Total Products", value: rows.length, color: "var(--olea-green-900)" },
          { label: "Low Stock", value: lowStock, color: "#a96f00" },
          { label: "Out of Stock", value: outOfStock, color: "#e53e3e" },
        ].map((s) => (
          <div key={s.label} style={{ background: "#fff", borderRadius: 12, padding: "18px 20px", boxShadow: "var(--shadow-sm)", border: "1px solid var(--border-subtle)" }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: s.color, fontFamily: "var(--font-display)" }}>{s.value}</div>
            <div style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: 14, boxShadow: "var(--shadow-sm)", border: "1px solid var(--border-subtle)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--olea-green-50)", borderBottom: "1px solid var(--border-subtle)" }}>
              {["Product", "Category", "Price", "Stock", "Status", "Actions"].map((h) => (
                <th key={h} style={{ padding: "13px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-2)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: "60px 20px", textAlign: "center", color: "var(--fg-2)", fontSize: 14 }}>
                  No products yet. <Link href="/admin/products/new" style={{ color: "var(--olea-green-700)", fontWeight: 600 }}>Add your first product →</Link>
                </td>
              </tr>
            )}
            {rows.map((p, i) => {
              const isLow = p.stock_quantity > 0 && p.stock_quantity <= p.low_stock_threshold;
              return (
                <tr key={p.id} style={{ borderBottom: i < rows.length - 1 ? "1px solid var(--border-subtle)" : "none", background: i % 2 === 0 ? "#fff" : "var(--olea-green-50)" }}>
                  {/* Product */}
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 8, overflow: "hidden", background: "var(--olea-green-100)", flexShrink: 0, position: "relative" }}>
                        {p.images?.[0] ? (
                          <Image src={p.images[0]} alt={p.name} fill style={{ objectFit: "cover" }} />
                        ) : (
                          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <PackageX size={18} style={{ color: "var(--fg-2)" }} />
                          </div>
                        )}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13, color: "var(--olea-ink)", lineHeight: 1.3 }}>{p.name}</div>
                        <div style={{ fontSize: 11, color: "var(--fg-2)", marginTop: 2 }}>{p.slug}</div>
                      </div>
                    </div>
                  </td>
                  {/* Category */}
                  <td style={{ padding: "14px 16px", fontSize: 13, color: "var(--fg-2)" }}>{CATEGORY_LABELS[p.category] ?? p.category}</td>
                  {/* Price */}
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--olea-ink)" }}>{formatPrice(p.price)}</div>
                    {p.compare_at_price && <div style={{ fontSize: 11, color: "var(--fg-2)", textDecoration: "line-through" }}>{formatPrice(p.compare_at_price)}</div>}
                  </td>
                  {/* Stock */}
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 4, background: p.stock_quantity === 0 ? "rgba(229,62,62,0.10)" : isLow ? "rgba(249,166,6,0.15)" : "rgba(56,161,105,0.12)", color: p.stock_quantity === 0 ? "#e53e3e" : isLow ? "#a96f00" : "#1d6b3f" }}>
                      {p.stock_quantity === 0 ? "Out of stock" : isLow ? `Low — ${p.stock_quantity} left` : `${p.stock_quantity} in stock`}
                    </span>
                  </td>
                  {/* Status */}
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 5, color: p.is_active ? "var(--olea-green-700)" : "var(--fg-2)" }}>
                      {p.is_active ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                      {p.is_active ? "Active" : "Hidden"}
                    </span>
                  </td>
                  {/* Actions */}
                  <td style={{ padding: "14px 16px" }}>
                    <Link href={`/admin/products/${p.id}`} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: "var(--olea-green-700)", background: "var(--olea-green-50)", padding: "6px 12px", borderRadius: 6, textDecoration: "none" }}>
                      <Edit2 size={13} /> Edit
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
