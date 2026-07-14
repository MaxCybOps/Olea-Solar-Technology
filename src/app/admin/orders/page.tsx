import type { Metadata } from "next";
import { Download, ShoppingBag } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase/admin";
import type { OrderRow } from "@/types/database";

export const metadata: Metadata = { title: "Orders" };
export const dynamic = "force-dynamic";

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  pending:    { bg: "rgba(229,62,62,0.10)",  color: "#b53030" },
  confirmed:  { bg: "rgba(249,166,6,0.15)",  color: "#8a5e00" },
  processing: { bg: "rgba(249,166,6,0.15)",  color: "#8a5e00" },
  shipped:    { bg: "rgba(26,122,74,0.12)",  color: "var(--olea-green-700)" },
  delivered:  { bg: "rgba(56,161,105,0.12)", color: "#1d6b3f" },
  cancelled:  { bg: "rgba(229,62,62,0.08)",  color: "#b53030" },
};

export default async function OrdersPage() {
  const { data, error } = await supabaseAdmin
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) console.error("Orders fetch error:", error);

  const orders = (data ?? []) as OrderRow[];
  const revenue = orders.filter((o) => o.status !== "cancelled").reduce((s, o) => s + o.total, 0);

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "32px 36px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, color: "var(--olea-ink)", margin: 0 }}>Orders</h1>
          <p style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 4 }}>
            {orders.length} orders · ₦{revenue.toLocaleString("en-NG")} revenue
          </p>
        </div>
        <button style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 18px", borderRadius: 10, border: "1.5px solid var(--border-subtle)", background: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-sans)", color: "var(--olea-ink)" }}>
          <Download size={14} /> Export CSV
        </button>
      </div>

      {/* Status summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 28 }}>
        {[
          { label: "Pending",   value: orders.filter((o) => o.status === "pending").length,   color: "#b53030" },
          { label: "Processing",value: orders.filter((o) => o.status === "processing").length, color: "#8a5e00" },
          { label: "Shipped",   value: orders.filter((o) => o.status === "shipped").length,    color: "var(--olea-green-700)" },
          { label: "Delivered", value: orders.filter((o) => o.status === "delivered").length,  color: "#1d6b3f" },
        ].map((s) => (
          <div key={s.label} style={{ background: "#fff", borderRadius: 12, padding: "16px 18px", boxShadow: "var(--shadow-sm)", border: "1px solid var(--border-subtle)" }}>
            <div style={{ fontSize: 26, fontWeight: 700, color: s.color, fontFamily: "var(--font-display)" }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "var(--fg-2)", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: 14, boxShadow: "var(--shadow-sm)", border: "1px solid var(--border-subtle)", overflow: "hidden" }}>
        {orders.length === 0 ? (
          <div style={{ padding: "80px 20px", textAlign: "center", color: "var(--fg-2)" }}>
            <ShoppingBag size={40} style={{ margin: "0 auto 16px", opacity: 0.3 }} />
            <p style={{ fontSize: 15, fontWeight: 600, color: "var(--olea-ink)" }}>No orders yet</p>
            <p style={{ fontSize: 13, marginTop: 6 }}>Orders placed on the storefront will appear here automatically.</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "var(--olea-green-50)", borderBottom: "1px solid var(--border-subtle)" }}>
                  {["Order #", "Customer", "Date", "Items Total", "Status", "Payment", ""].map((h) => (
                    <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-2)", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((o, i) => {
                  const s = STATUS_STYLES[o.status] ?? { bg: "#eee", color: "#666" };
                  return (
                    <tr key={o.id} style={{ borderBottom: i < orders.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
                      <td style={{ padding: "14px 16px", fontWeight: 700, fontSize: 12, color: "var(--olea-green-700)", fontFamily: "monospace" }}>{o.order_number}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{o.customer_name}</div>
                        <div style={{ fontSize: 11, color: "var(--fg-2)" }}>{o.customer_email}</div>
                      </td>
                      <td style={{ padding: "14px 16px", color: "var(--fg-2)", fontSize: 12, whiteSpace: "nowrap" }}>
                        {new Date(o.created_at).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                      <td style={{ padding: "14px 16px", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
                        ₦{o.total.toLocaleString("en-NG")}
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{ background: s.bg, color: s.color, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 4 }}>
                          {o.status}
                        </span>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 4, background: o.payment_status === "paid" ? "rgba(56,161,105,0.12)" : "rgba(229,62,62,0.10)", color: o.payment_status === "paid" ? "#1d6b3f" : "#b53030", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                          {o.payment_status}
                        </span>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <button style={{ fontSize: 12, color: "var(--olea-green-700)", background: "transparent", border: "none", cursor: "pointer", fontFamily: "var(--font-sans)", fontWeight: 600 }}>View →</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
