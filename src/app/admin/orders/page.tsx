import type { Metadata } from "next";
import { Search, Filter, Download } from "lucide-react";

export const metadata: Metadata = { title: "Orders" };

const ORDERS = [
  { id: "OT-20260601-A1B2", customer: "Emmanuel Okafor",  email: "e.okafor@email.com",  phone: "08012345678", items: 3, total: 1850000, status: "PAID",       date: "Jun 1, 2026",  state: "Lagos" },
  { id: "OT-20260601-C3D4", customer: "Ngozi Adeyemi",    email: "ngozi@company.ng",    phone: "08023456789", items: 1, total: 280000,  status: "PROCESSING", date: "Jun 1, 2026",  state: "Abuja" },
  { id: "OT-20260531-E5F6", customer: "Chukwudi Mensah",  email: "c.mensah@firm.ng",   phone: "08034567890", items: 2, total: 698000,  status: "PAID",       date: "May 31, 2026", state: "Enugu" },
  { id: "OT-20260531-G7H8", customer: "Adaeze Nwosu",     email: "ada@homes.ng",        phone: "08045678901", items: 1, total: 95000,   status: "PENDING",    date: "May 31, 2026", state: "Port Harcourt" },
  { id: "OT-20260530-I9J0", customer: "Babatunde Lawal",  email: "b.lawal@corp.ng",     phone: "08056789012", items: 4, total: 2430000, status: "SHIPPED",    date: "May 30, 2026", state: "Lagos" },
  { id: "OT-20260529-K1L2", customer: "Chinwe Obi",       email: "chinwe@obi.ng",       phone: "08067890123", items: 2, total: 715000,  status: "DELIVERED",  date: "May 29, 2026", state: "Abuja" },
  { id: "OT-20260528-M3N4", customer: "Emeka Eze",        email: "emeka.eze@email.ng",  phone: "08078901234", items: 1, total: 620000,  status: "PAID",       date: "May 28, 2026", state: "Lagos" },
  { id: "OT-20260527-O5P6", customer: "Fatima Musa",      email: "fatima@musa.ng",      phone: "08089012345", items: 3, total: 1245000, status: "CANCELLED",  date: "May 27, 2026", state: "Kano" },
];

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  PAID:       { bg: "rgba(56,161,105,0.12)",  color: "#1d6b3f" },
  PROCESSING: { bg: "rgba(249,166,6,0.15)",   color: "#8a5e00" },
  PENDING:    { bg: "rgba(229,62,62,0.10)",   color: "#b53030" },
  SHIPPED:    { bg: "rgba(26,122,74,0.12)",   color: "var(--olea-green-700)" },
  DELIVERED:  { bg: "rgba(56,161,105,0.12)",  color: "#1d6b3f" },
  CANCELLED:  { bg: "rgba(229,62,62,0.08)",   color: "#b53030" },
};

export default function OrdersPage() {
  const total = ORDERS.reduce((s, o) => s + (o.status !== "CANCELLED" ? o.total : 0), 0);

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontWeight: 700, fontSize: 22, margin: "0 0 4px", color: "var(--olea-ink)" }}>Orders</h1>
          <p style={{ fontSize: 13, color: "var(--fg-2)", margin: 0 }}>{ORDERS.length} orders · ₦{total.toLocaleString("en-NG")} revenue</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 8, border: "1.5px solid var(--border-subtle)", background: "#fff", fontSize: 13, cursor: "pointer", fontFamily: "var(--font-sans)", color: "var(--olea-ink)" }}>
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ background: "#fff", borderRadius: 12, padding: "14px 18px", boxShadow: "var(--shadow-sm)", marginBottom: 16, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, border: "1.5px solid var(--border-subtle)", borderRadius: 8, padding: "8px 14px", flex: 1, minWidth: 200 }}>
          <Search size={14} style={{ color: "var(--fg-2)" }} />
          <input placeholder="Search orders, customers…" style={{ border: "none", outline: "none", fontSize: 13, fontFamily: "var(--font-sans)", background: "transparent", flex: 1 }} />
        </div>
        {["All", "Pending", "Paid", "Processing", "Shipped", "Delivered", "Cancelled"].map((s) => (
          <button key={s} style={{ padding: "7px 14px", borderRadius: 8, border: "1.5px solid", fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "var(--font-sans)", background: s === "All" ? "var(--brand)" : "#fff", borderColor: s === "All" ? "var(--brand)" : "var(--border-subtle)", color: s === "All" ? "#fff" : "var(--fg-2)" }}>
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: 12, boxShadow: "var(--shadow-sm)", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-page)" }}>
                {["Order #", "Customer", "Date", "State", "Items", "Total", "Status", ""].map((h) => (
                  <th key={h} style={{ padding: "11px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-2)", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ORDERS.map((o, i) => {
                const s = STATUS_STYLES[o.status] ?? { bg: "#eee", color: "#666" };
                return (
                  <tr key={o.id} style={{ borderBottom: i < ORDERS.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
                    <td style={{ padding: "13px 16px", fontWeight: 600, fontSize: 12, color: "var(--olea-green-700)", fontFamily: "monospace", whiteSpace: "nowrap" }}>{o.id}</td>
                    <td style={{ padding: "13px 16px" }}>
                      <div style={{ fontWeight: 500 }}>{o.customer}</div>
                      <div style={{ fontSize: 11, color: "var(--fg-2)" }}>{o.email}</div>
                    </td>
                    <td style={{ padding: "13px 16px", color: "var(--fg-2)", whiteSpace: "nowrap", fontSize: 12 }}>{o.date}</td>
                    <td style={{ padding: "13px 16px", color: "var(--fg-2)", fontSize: 12 }}>{o.state}</td>
                    <td style={{ padding: "13px 16px", textAlign: "center", color: "var(--fg-2)" }}>{o.items}</td>
                    <td style={{ padding: "13px 16px", fontWeight: 700, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>₦{o.total.toLocaleString()}</td>
                    <td style={{ padding: "13px 16px" }}>
                      <span style={{ background: s.bg, color: s.color, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 4 }}>{o.status}</span>
                    </td>
                    <td style={{ padding: "13px 16px" }}>
                      <button style={{ fontSize: 12, color: "var(--olea-green-700)", background: "transparent", border: "none", cursor: "pointer", fontFamily: "var(--font-sans)", fontWeight: 600 }}>View →</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
