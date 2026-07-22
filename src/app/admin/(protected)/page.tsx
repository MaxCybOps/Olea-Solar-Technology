import type { Metadata } from "next";
import { ShoppingBag, Users, TrendingUp, Zap, ArrowUpRight, ArrowDownRight, Package, AlertCircle, Star, Mail } from "lucide-react";
import { fetchLowStockProducts } from "@/lib/supabase/products";
import { SEED_PRODUCTS } from "@/lib/products-data";
import { supabaseAdmin } from "@/lib/supabase/admin";
import type { OrderRow, LeadRow, ReviewRow } from "@/types/database";

export const metadata: Metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  pending:     { bg: "rgba(229,62,62,0.10)",  color: "#b53030" },
  confirmed:   { bg: "rgba(249,166,6,0.15)",  color: "#8a5e00" },
  processing:  { bg: "rgba(249,166,6,0.15)",  color: "#8a5e00" },
  shipped:     { bg: "rgba(26,122,74,0.12)",  color: "var(--olea-green-700)" },
  delivered:   { bg: "rgba(56,161,105,0.12)", color: "#1d6b3f" },
  cancelled:   { bg: "rgba(229,62,62,0.08)",  color: "#b53030" },
};

function fmtNaira(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}hr ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const w = 800, h = 200, pad = 20;
  const max = Math.max(...data, 1) * 1.1;
  const xs = data.map((_, i) => pad + (i / Math.max(data.length - 1, 1)) * (w - pad * 2));
  const ys = data.map((v) => h - pad - (v / max) * (h - pad * 2));
  const line = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(" ");
  const area = `${line} L${xs[xs.length - 1]},${h - pad} L${xs[0]},${h - pad} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={180} preserveAspectRatio="none" style={{ display: "block" }}>
      <defs>
        <linearGradient id="admGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((p) => (
        <line key={p} x1={pad} x2={w - pad} y1={pad + (h - pad * 2) * p} y2={pad + (h - pad * 2) * p} stroke="#e8e8e4" strokeDasharray="3 5" />
      ))}
      <path d={area} fill="url(#admGrad)" />
      <path d={line} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

interface ActivityItem {
  icon: typeof ShoppingBag;
  tone: "success" | "warning" | "default";
  what: string;
  who: string;
  when: string;
  at: number;
}

async function fetchDashboardData() {
  try {
    const [ordersRes, leadsRes, reviewsRes] = await Promise.all([
      supabaseAdmin.from("orders").select("*").order("created_at", { ascending: false }).limit(50),
      supabaseAdmin.from("leads").select("*").order("created_at", { ascending: false }).limit(20),
      supabaseAdmin.from("reviews").select("*").order("created_at", { ascending: false }).limit(10),
    ]);

    const orders = (ordersRes.data ?? []) as unknown as OrderRow[];
    const leads = (leadsRes.data ?? []) as unknown as LeadRow[];
    const reviews = (reviewsRes.data ?? []) as unknown as ReviewRow[];

    return { orders, leads, reviews };
  } catch {
    return { orders: [] as OrderRow[], leads: [] as LeadRow[], reviews: [] as ReviewRow[] };
  }
}

export default async function AdminDashboard() {
  const [{ orders, leads, reviews }, dbLowStock] = await Promise.all([
    fetchDashboardData(),
    fetchLowStockProducts(),
  ]);

  const lowStock = dbLowStock.length > 0
    ? dbLowStock
    : SEED_PRODUCTS.filter((p) => p.stockQuantity <= p.lowStockThreshold).map((p) => ({
        id: p.id, name: p.name, slug: p.slug, category: p.category,
        stock_quantity: p.stockQuantity, low_stock_threshold: p.lowStockThreshold,
      }));

  // ── KPIs, computed from real orders/leads ──
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const paidOrders = orders.filter((o) => o.payment_status === "paid");
  const ordersThisMonth = orders.filter((o) => new Date(o.created_at) >= startOfMonth);
  const ordersLastMonth = orders.filter((o) => new Date(o.created_at) >= startOfLastMonth && new Date(o.created_at) < startOfMonth);
  const revenueThisMonth = paidOrders.filter((o) => new Date(o.created_at) >= startOfMonth).reduce((s, o) => s + o.total, 0);
  const revenueLastMonth = paidOrders.filter((o) => new Date(o.created_at) >= startOfLastMonth && new Date(o.created_at) < startOfMonth).reduce((s, o) => s + o.total, 0);
  const revenueChange = revenueLastMonth > 0 ? ((revenueThisMonth - revenueLastMonth) / revenueLastMonth) * 100 : (revenueThisMonth > 0 ? 100 : 0);
  const orderChange = ordersLastMonth.length > 0 ? ((ordersThisMonth.length - ordersLastMonth.length) / ordersLastMonth.length) * 100 : (ordersThisMonth.length > 0 ? 100 : 0);
  const leadsThisMonth = leads.filter((l) => new Date(l.created_at) >= startOfMonth);
  const avgOrder = paidOrders.length > 0 ? paidOrders.reduce((s, o) => s + o.total, 0) / paidOrders.length : 0;

  const KPIS = [
    { label: "Total Revenue", value: fmtNaira(revenueThisMonth), change: `${revenueChange >= 0 ? "+" : ""}${revenueChange.toFixed(1)}%`, up: revenueChange >= 0, icon: TrendingUp, color: "var(--olea-green-600)", bg: "rgba(26,122,74,0.10)" },
    { label: "Orders (MTD)",  value: String(ordersThisMonth.length), change: `${orderChange >= 0 ? "+" : ""}${orderChange.toFixed(1)}%`, up: orderChange >= 0, icon: ShoppingBag, color: "#c88a00", bg: "rgba(249,166,6,0.12)" },
    { label: "New Leads",     value: String(leadsThisMonth.length), change: `${leadsThisMonth.length}`, up: true, icon: Users, color: "var(--olea-green-600)", bg: "rgba(26,122,74,0.10)" },
    { label: "Avg Order",     value: fmtNaira(Math.round(avgOrder)), change: `${paidOrders.length} paid`, up: true, icon: Zap, color: "#e53e3e", bg: "rgba(229,62,62,0.08)" },
  ];

  // ── Revenue chart: last 30 days, real orders ──
  const REVENUE_DATA = Array.from({ length: 30 }, (_, i) => {
    const day = new Date(now);
    day.setDate(now.getDate() - (29 - i));
    const dayTotal = paidOrders
      .filter((o) => new Date(o.created_at).toDateString() === day.toDateString())
      .reduce((s, o) => s + o.total, 0);
    return dayTotal / 1_000_000; // in millions for chart scale
  });
  const hasRevenueData = REVENUE_DATA.some((v) => v > 0);

  // ── Recent orders: real, latest 5 ──
  const recentOrders = orders.slice(0, 5);

  // ── Activity feed: merged real orders + leads + reviews, sorted by time ──
  const activity: ActivityItem[] = [
    ...orders.slice(0, 5).map((o) => ({
      icon: ShoppingBag, tone: "success" as const,
      what: `New order ${o.order_number} placed`, who: o.customer_name,
      when: timeAgo(o.created_at), at: new Date(o.created_at).getTime(),
    })),
    ...leads.slice(0, 5).map((l) => ({
      icon: Mail, tone: "warning" as const,
      what: `New inquiry from ${l.name}`, who: l.email,
      when: timeAgo(l.created_at), at: new Date(l.created_at).getTime(),
    })),
    ...reviews.slice(0, 3).map((r) => ({
      icon: Star, tone: "default" as const,
      what: `New ${r.rating}★ review submitted`, who: r.customer_name,
      when: timeAgo(r.created_at), at: new Date(r.created_at).getTime(),
    })),
  ].sort((a, b) => b.at - a.at).slice(0, 6);

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontWeight: 700, fontSize: 22, margin: "0 0 4px", color: "var(--olea-ink)" }}>Dashboard</h1>
        <p style={{ fontSize: 13, color: "var(--fg-2)", margin: 0 }}>Welcome back. Here's what's happening today.</p>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }} className="adm-kpi-grid">
        {KPIS.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "var(--shadow-sm)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <span style={{ fontSize: 12, fontWeight: 500, color: "var(--fg-2)" }}>{k.label}</span>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: k.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={17} style={{ color: k.color }} />
                </div>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, color: "var(--olea-ink)", marginBottom: 6, fontVariantNumeric: "tabular-nums" }}>{k.value}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12 }}>
                {k.up ? <ArrowUpRight size={14} style={{ color: "#1d6b3f" }} /> : <ArrowDownRight size={14} style={{ color: "#b53030" }} />}
                <span style={{ color: k.up ? "#1d6b3f" : "#b53030", fontWeight: 600 }}>{k.change}</span>
                <span style={{ color: "var(--fg-2)" }}>vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20, alignItems: "start" }} className="adm-main-grid">

        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Revenue chart */}
          <div style={{ background: "#fff", borderRadius: 12, boxShadow: "var(--shadow-sm)", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-subtle)" }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Revenue · last 30 days</div>
              <div style={{ fontSize: 12, color: "var(--fg-2)" }}>
                {hasRevenueData ? `MTD ${fmtNaira(revenueThisMonth)}` : "No paid orders yet"}
              </div>
            </div>
            <div style={{ padding: "12px 20px 16px" }}>
              <Sparkline data={REVENUE_DATA} color="var(--olea-green-600)" />
            </div>
          </div>

          {/* Recent orders */}
          <div style={{ background: "#fff", borderRadius: 12, boxShadow: "var(--shadow-sm)", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-subtle)" }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Recent Orders</div>
              <div style={{ fontSize: 12, color: "var(--fg-2)" }}>Latest activity</div>
            </div>
            {recentOrders.length === 0 ? (
              <div style={{ padding: "40px 20px", textAlign: "center", color: "var(--fg-2)", fontSize: 13 }}>
                No orders yet. They'll appear here as customers check out.
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                      {["Order #", "Customer", "Total", "Status"].map((h) => (
                        <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-2)", whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((o, i) => {
                      const s = STATUS_STYLES[o.status] ?? { bg: "#eee", color: "#666" };
                      return (
                        <tr key={o.id} style={{ borderBottom: i < recentOrders.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
                          <td style={{ padding: "12px 16px", fontWeight: 600, fontSize: 12, color: "var(--olea-green-700)", fontFamily: "monospace", whiteSpace: "nowrap" }}>{o.order_number}</td>
                          <td style={{ padding: "12px 16px" }}>
                            <div style={{ fontWeight: 500, fontSize: 13 }}>{o.customer_name}</div>
                            <div style={{ fontSize: 11, color: "var(--fg-2)" }}>{o.customer_email}</div>
                          </td>
                          <td style={{ padding: "12px 16px", fontWeight: 700, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>{fmtNaira(o.total)}</td>
                          <td style={{ padding: "12px 16px" }}>
                            <span style={{ background: s.bg, color: s.color, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 4, whiteSpace: "nowrap" }}>{o.status}</span>
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

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Activity feed */}
          <div style={{ background: "#fff", borderRadius: 12, boxShadow: "var(--shadow-sm)", overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border-subtle)" }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Activity Feed</div>
              <div style={{ fontSize: 12, color: "var(--fg-2)" }}>Live across orders, leads, reviews</div>
            </div>
            {activity.length === 0 ? (
              <div style={{ padding: "40px 18px", textAlign: "center", color: "var(--fg-2)", fontSize: 13 }}>
                Nothing yet. Activity shows up here as it happens.
              </div>
            ) : (
              activity.map((a, i) => {
                const Icon = a.icon;
                const iconStyle = a.tone === "success"
                  ? { bg: "rgba(56,161,105,0.10)", color: "#1d6b3f" }
                  : a.tone === "warning"
                  ? { bg: "rgba(249,166,6,0.18)", color: "#8a5e00" }
                  : { bg: "rgba(26,122,74,0.10)", color: "var(--olea-green-700)" };
                return (
                  <div key={i} style={{ display: "flex", gap: 12, padding: "13px 18px", alignItems: "flex-start", borderBottom: i < activity.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
                    <div style={{ width: 30, height: 30, borderRadius: 8, flexShrink: 0, background: iconStyle.bg, color: iconStyle.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={14} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12.5, color: "var(--olea-ink)", lineHeight: 1.4 }}>{a.what}</div>
                      <div style={{ fontSize: 11, color: "var(--fg-2)", marginTop: 2 }}>{a.who} · {a.when}</div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Low stock */}
          <div style={{ background: "#fff", borderRadius: 12, boxShadow: "var(--shadow-sm)", overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", gap: 8 }}>
              <AlertCircle size={15} style={{ color: "#a96f00" }} />
              <div style={{ fontWeight: 600, fontSize: 14 }}>Stock to Watch</div>
            </div>
            {lowStock.map((p) => (
              <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 18px", borderBottom: "1px solid var(--border-subtle)" }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: "var(--olea-green-50)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Package size={16} style={{ color: "var(--olea-green-700)" }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: "var(--fg-2)" }}>{p.category}</div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 4, background: p.stock_quantity === 0 ? "rgba(229,62,62,0.10)" : "rgba(249,166,6,0.15)", color: p.stock_quantity === 0 ? "#b53030" : "#8a5e00", whiteSpace: "nowrap" }}>
                  {p.stock_quantity === 0 ? "Out of stock" : `${p.stock_quantity} left`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) { .adm-kpi-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 900px)  { .adm-main-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 640px)  { .adm-kpi-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </div>
  );
}
