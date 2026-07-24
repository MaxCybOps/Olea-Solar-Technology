import type { Metadata } from "next";
import { TrendingUp, Package, Star, Users } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase/admin";
import type { OrderRow, OrderItemRow, LeadRow, ReviewRow } from "@/types/database";

export const metadata: Metadata = { title: "Analytics" };
export const dynamic = "force-dynamic";

function fmtNaira(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}

async function fetchAnalyticsData() {
  try {
    const [ordersRes, itemsRes, leadsRes, reviewsRes] = await Promise.all([
      supabaseAdmin.from("orders").select("*"),
      supabaseAdmin.from("order_items").select("*"),
      supabaseAdmin.from("leads").select("*"),
      supabaseAdmin.from("reviews").select("*"),
    ]);
    return {
      orders: (ordersRes.data ?? []) as unknown as OrderRow[],
      items: (itemsRes.data ?? []) as unknown as OrderItemRow[],
      leads: (leadsRes.data ?? []) as unknown as LeadRow[],
      reviews: (reviewsRes.data ?? []) as unknown as ReviewRow[],
    };
  } catch {
    return { orders: [] as OrderRow[], items: [] as OrderItemRow[], leads: [] as LeadRow[], reviews: [] as ReviewRow[] };
  }
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const w = 800, h = 160, pad = 16;
  const max = Math.max(...data, 1) * 1.1;
  const xs = data.map((_, i) => pad + (i / Math.max(data.length - 1, 1)) * (w - pad * 2));
  const ys = data.map((v) => h - pad - (v / max) * (h - pad * 2));
  const line = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(" ");
  const area = `${line} L${xs[xs.length - 1]},${h - pad} L${xs[0]},${h - pad} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={140} preserveAspectRatio="none" style={{ display: "block" }}>
      <defs>
        <linearGradient id="anaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#anaGrad)" />
      <path d={line} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

export default async function AnalyticsPage() {
  const { orders, items, leads, reviews } = await fetchAnalyticsData();
  const paidOrders = orders.filter((o) => o.payment_status === "paid");

  const now = new Date();
  const REVENUE_30D = Array.from({ length: 30 }, (_, i) => {
    const day = new Date(now);
    day.setDate(now.getDate() - (29 - i));
    return paidOrders.filter((o) => new Date(o.created_at).toDateString() === day.toDateString()).reduce((s, o) => s + o.total, 0) / 1000;
  });

  const totalRevenue = paidOrders.reduce((s, o) => s + o.total, 0);
  const avgOrderValue = paidOrders.length > 0 ? totalRevenue / paidOrders.length : 0;

  // Top products by revenue
  const productTotals = new Map<string, { name: string; revenue: number; units: number }>();
  for (const item of items) {
    const existing = productTotals.get(item.product_name);
    if (existing) {
      existing.revenue += item.total_price;
      existing.units += item.quantity;
    } else {
      productTotals.set(item.product_name, { name: item.product_name, revenue: item.total_price, units: item.quantity });
    }
  }
  const topProducts = Array.from(productTotals.values()).sort((a, b) => b.revenue - a.revenue).slice(0, 6);

  // Lead status breakdown
  const leadStatusCounts = leads.reduce<Record<string, number>>((acc, l) => {
    acc[l.status] = (acc[l.status] ?? 0) + 1;
    return acc;
  }, {});

  // Lead type breakdown
  const leadTypeCounts = leads.reduce<Record<string, number>>((acc, l) => {
    acc[l.type] = (acc[l.type] ?? 0) + 1;
    return acc;
  }, {});

  // Review rating breakdown
  const ratingCounts = [1, 2, 3, 4, 5].map((n) => ({
    rating: n,
    count: reviews.filter((r) => r.rating === n).length,
  }));
  const avgRating = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  const conversionRate = leads.length > 0 ? (orders.length / leads.length) * 100 : 0;

  const cardStyle: React.CSSProperties = { background: "#fff", borderRadius: 12, padding: 20, boxShadow: "var(--shadow-sm)", border: "1px solid var(--border-subtle)" };

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "32px 36px" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, color: "var(--olea-ink)", margin: 0 }}>Analytics</h1>
        <p style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 4 }}>Real numbers from your orders, leads, and reviews</p>
      </div>

      {orders.length === 0 && leads.length === 0 && (
        <div style={{ background: "rgba(249,166,6,0.10)", border: "1px solid rgba(249,166,6,0.3)", borderRadius: 10, padding: "14px 18px", marginBottom: 24, fontSize: 13, color: "#8a5e00" }}>
          No orders or leads yet. These charts will fill in automatically as real activity comes through the site.
        </div>
      )}

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }} className="ana-grid">
        <div style={cardStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, color: "var(--fg-2)", fontSize: 12 }}><TrendingUp size={14} /> Total Revenue</div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, color: "var(--olea-ink)" }}>{fmtNaira(totalRevenue)}</div>
        </div>
        <div style={cardStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, color: "var(--fg-2)", fontSize: 12 }}><Package size={14} /> Avg Order Value</div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, color: "var(--olea-ink)" }}>{fmtNaira(Math.round(avgOrderValue))}</div>
        </div>
        <div style={cardStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, color: "var(--fg-2)", fontSize: 12 }}><Users size={14} /> Lead → Order Rate</div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, color: "var(--olea-ink)" }}>{conversionRate.toFixed(1)}%</div>
        </div>
        <div style={cardStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, color: "var(--fg-2)", fontSize: 12 }}><Star size={14} /> Avg Rating</div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, color: "var(--olea-ink)" }}>{reviews.length > 0 ? avgRating.toFixed(1) : "—"}</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }} className="ana-grid-2">
        {/* Revenue trend */}
        <div style={cardStyle}>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}>Revenue Trend (₦'000) · 30 days</div>
          <Sparkline data={REVENUE_30D} color="var(--olea-green-600)" />
        </div>

        {/* Top products */}
        <div style={cardStyle}>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 14 }}>Top Products by Revenue</div>
          {topProducts.length === 0 ? (
            <p style={{ fontSize: 13, color: "var(--fg-2)" }}>No sales data yet.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {topProducts.map((p) => {
                const pct = topProducts[0] ? (p.revenue / topProducts[0].revenue) * 100 : 0;
                return (
                  <div key={p.name}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 4 }}>
                      <span style={{ color: "var(--olea-ink)", fontWeight: 500 }}>{p.name}</span>
                      <span style={{ color: "var(--fg-2)" }}>{fmtNaira(p.revenue)} · {p.units} sold</span>
                    </div>
                    <div style={{ height: 6, background: "var(--olea-green-50)", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: "var(--olea-green-600)", borderRadius: 3 }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }} className="ana-grid-3">
        {/* Lead status */}
        <div style={cardStyle}>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 14 }}>Leads by Status</div>
          {Object.keys(leadStatusCounts).length === 0 ? (
            <p style={{ fontSize: 13, color: "var(--fg-2)" }}>No leads yet.</p>
          ) : (
            Object.entries(leadStatusCounts).map(([status, count]) => (
              <div key={status} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 13, borderBottom: "1px solid var(--border-subtle)", textTransform: "capitalize" }}>
                <span style={{ color: "var(--fg-2)" }}>{status}</span>
                <span style={{ fontWeight: 700 }}>{count}</span>
              </div>
            ))
          )}
        </div>

        {/* Lead type */}
        <div style={cardStyle}>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 14 }}>Leads by Interest</div>
          {Object.keys(leadTypeCounts).length === 0 ? (
            <p style={{ fontSize: 13, color: "var(--fg-2)" }}>No leads yet.</p>
          ) : (
            Object.entries(leadTypeCounts).map(([type, count]) => (
              <div key={type} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 13, borderBottom: "1px solid var(--border-subtle)", textTransform: "capitalize" }}>
                <span style={{ color: "var(--fg-2)" }}>{type}</span>
                <span style={{ fontWeight: 700 }}>{count}</span>
              </div>
            ))
          )}
        </div>

        {/* Rating distribution */}
        <div style={cardStyle}>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 14 }}>Review Ratings</div>
          {reviews.length === 0 ? (
            <p style={{ fontSize: 13, color: "var(--fg-2)" }}>No reviews yet.</p>
          ) : (
            ratingCounts.reverse().map(({ rating, count }) => {
              const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
              return (
                <div key={rating} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 12, width: 34, color: "var(--fg-2)" }}>{rating}★</span>
                  <div style={{ flex: 1, height: 6, background: "var(--olea-green-50)", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: "var(--accent)", borderRadius: 3 }} />
                  </div>
                  <span style={{ fontSize: 11.5, width: 18, color: "var(--fg-2)", textAlign: "right" }}>{count}</span>
                </div>
              );
            })
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) { .ana-grid { grid-template-columns: repeat(2, 1fr) !important; } .ana-grid-3 { grid-template-columns: 1fr !important; } }
        @media (max-width: 900px)  { .ana-grid-2 { grid-template-columns: 1fr !important; } }
        @media (max-width: 640px)  { .ana-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
