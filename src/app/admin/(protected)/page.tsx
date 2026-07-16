import type { Metadata } from "next";
import { ShoppingBag, Users, TrendingUp, Zap, ArrowUpRight, ArrowDownRight, Package, AlertCircle } from "lucide-react";
import { fetchLowStockProducts } from "@/lib/supabase/products";
import { SEED_PRODUCTS } from "@/lib/products-data";

export const metadata: Metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

const KPIS = [
  { label: "Total Revenue", value: "₦47.2M", change: "+18.4%", up: true, icon: TrendingUp, color: "var(--olea-green-600)", bg: "rgba(26,122,74,0.10)" },
  { label: "Orders (MTD)",  value: "142",    change: "+23.1%", up: true, icon: ShoppingBag, color: "#c88a00", bg: "rgba(249,166,6,0.12)" },
  { label: "New Leads",     value: "38",     change: "+8",     up: true, icon: Users,       color: "var(--olea-green-600)", bg: "rgba(26,122,74,0.10)" },
  { label: "Avg Order",     value: "₦332k",  change: "-4.2%",  up: false, icon: Zap,         color: "#e53e3e", bg: "rgba(229,62,62,0.08)" },
];

const RECENT_ORDERS = [
  { id: "OT-20260601-A1B2", customer: "Emmanuel Okafor",  email: "e.okafor@email.com",  items: 3, total: 1850000, status: "PAID" },
  { id: "OT-20260601-C3D4", customer: "Ngozi Adeyemi",    email: "ngozi@company.ng",    items: 1, total: 280000,  status: "PROCESSING" },
  { id: "OT-20260531-E5F6", customer: "Chukwudi Mensah",  email: "c.mensah@firm.ng",   items: 2, total: 698000,  status: "PAID" },
  { id: "OT-20260531-G7H8", customer: "Adaeze Nwosu",     email: "ada@homes.ng",        items: 1, total: 95000,   status: "PENDING" },
  { id: "OT-20260530-I9J0", customer: "Babatunde Lawal",  email: "b.lawal@corp.ng",     items: 4, total: 2430000, status: "SHIPPED" },
];

const ACTIVITY = [
  { icon: ShoppingBag, tone: "success",  what: "New order OT-20260601-A1B2 placed",  who: "Emmanuel Okafor",  when: "2 min ago" },
  { icon: Zap,         tone: "default",  what: "Payment verified via Paystack",       who: "System",           when: "3 min ago" },
  { icon: Users,       tone: "warning",  what: "New inquiry from Ngozi Adeyemi",      who: "Lagos",            when: "14 min ago" },
  { icon: Package,     tone: "warning",  what: "200Ah Lithium Battery low stock (8)", who: "Inventory",        when: "1hr ago" },
  { icon: ShoppingBag, tone: "success",  what: "Order OT-20260531-E5F6 shipped",      who: "Ops team",         when: "3hr ago" },
];

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  PAID:       { bg: "rgba(56,161,105,0.12)",  color: "#1d6b3f" },
  PROCESSING: { bg: "rgba(249,166,6,0.15)",   color: "#8a5e00" },
  PENDING:    { bg: "rgba(229,62,62,0.10)",   color: "#b53030" },
  SHIPPED:    { bg: "rgba(26,122,74,0.12)",   color: "var(--olea-green-700)" },
  DELIVERED:  { bg: "rgba(56,161,105,0.12)",  color: "#1d6b3f" },
  CANCELLED:  { bg: "rgba(229,62,62,0.08)",   color: "#b53030" },
};

function fmtNaira(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}

// Simple SVG sparkline chart
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const w = 800, h = 200, pad = 20;
  const max = Math.max(...data) * 1.1;
  const xs = data.map((_, i) => pad + (i / (data.length - 1)) * (w - pad * 2));
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

const REVENUE_DATA = [1.2, 2.1, 1.8, 3.4, 2.9, 4.1, 3.6, 5.2, 4.8, 6.1, 5.4, 7.2, 6.8, 5.9, 7.8, 6.4, 8.1, 7.6, 9.2, 8.7, 7.9, 9.8, 8.4, 10.2, 9.6, 11.1, 10.4, 9.8, 11.6, 12.3];

export default async function AdminDashboard() {
  const dbLowStock = await fetchLowStockProducts();
  const lowStock = dbLowStock.length > 0
    ? dbLowStock
    : SEED_PRODUCTS.filter((p) => p.stockQuantity <= p.lowStockThreshold).map((p) => ({
        id: p.id, name: p.name, slug: p.slug, category: p.category,
        stock_quantity: p.stockQuantity, low_stock_threshold: p.lowStockThreshold,
      }));

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
            <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Revenue · last 30 days</div>
                <div style={{ fontSize: 12, color: "var(--fg-2)" }}>₦M per day · MTD ₦47.2M <span style={{ color: "#1d6b3f" }}>(+18.4%)</span></div>
              </div>
            </div>
            <div style={{ padding: "12px 20px 16px" }}>
              <Sparkline data={REVENUE_DATA} color="var(--olea-green-600)" />
            </div>
          </div>

          {/* Recent orders */}
          <div style={{ background: "#fff", borderRadius: 12, boxShadow: "var(--shadow-sm)", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Recent Orders</div>
                <div style={{ fontSize: 12, color: "var(--fg-2)" }}>Last 24 hours</div>
              </div>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    {["Order #", "Customer", "Items", "Total", "Status"].map((h) => (
                      <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-2)", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {RECENT_ORDERS.map((o, i) => {
                    const s = STATUS_STYLES[o.status] ?? { bg: "#eee", color: "#666" };
                    return (
                      <tr key={o.id} style={{ borderBottom: i < RECENT_ORDERS.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
                        <td style={{ padding: "12px 16px", fontWeight: 600, fontSize: 12, color: "var(--olea-green-700)", fontFamily: "monospace", whiteSpace: "nowrap" }}>{o.id}</td>
                        <td style={{ padding: "12px 16px" }}>
                          <div style={{ fontWeight: 500, fontSize: 13 }}>{o.customer}</div>
                          <div style={{ fontSize: 11, color: "var(--fg-2)" }}>{o.email}</div>
                        </td>
                        <td style={{ padding: "12px 16px", textAlign: "center", color: "var(--fg-2)" }}>{o.items}</td>
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
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Activity feed */}
          <div style={{ background: "#fff", borderRadius: 12, boxShadow: "var(--shadow-sm)", overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border-subtle)" }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Activity Feed</div>
              <div style={{ fontSize: 12, color: "var(--fg-2)" }}>Live across orders, payments, leads</div>
            </div>
            {ACTIVITY.map((a, i) => {
              const Icon = a.icon;
              const iconStyle = a.tone === "success"
                ? { bg: "rgba(56,161,105,0.10)", color: "#1d6b3f" }
                : a.tone === "warning"
                ? { bg: "rgba(249,166,6,0.18)", color: "#8a5e00" }
                : { bg: "rgba(26,122,74,0.10)", color: "var(--olea-green-700)" };
              return (
                <div key={i} style={{ display: "flex", gap: 12, padding: "13px 18px", alignItems: "flex-start", borderBottom: i < ACTIVITY.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, flexShrink: 0, background: iconStyle.bg, color: iconStyle.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={14} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, color: "var(--olea-ink)", lineHeight: 1.4 }}>{a.what}</div>
                    <div style={{ fontSize: 11, color: "var(--fg-2)", marginTop: 2 }}>{a.who} · {a.when}</div>
                  </div>
                </div>
              );
            })}
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
