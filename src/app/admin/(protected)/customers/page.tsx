import type { Metadata } from "next";
import { Users } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase/admin";
import type { OrderRow } from "@/types/database";

export const metadata: Metadata = { title: "Customers" };
export const dynamic = "force-dynamic";

interface Customer {
  email: string;
  name: string;
  phone: string | null;
  orderCount: number;
  totalSpent: number;
  lastOrderAt: string;
}

async function fetchCustomers(): Promise<Customer[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) return [];

    const rows = data as unknown as OrderRow[];
    const byEmail = new Map<string, Customer>();

    for (const o of rows) {
      const existing = byEmail.get(o.customer_email);
      if (existing) {
        existing.orderCount += 1;
        existing.totalSpent += o.total;
      } else {
        byEmail.set(o.customer_email, {
          email: o.customer_email,
          name: o.customer_name,
          phone: o.customer_phone,
          orderCount: 1,
          totalSpent: o.total,
          lastOrderAt: o.created_at,
        });
      }
    }

    return Array.from(byEmail.values()).sort((a, b) => b.totalSpent - a.totalSpent);
  } catch {
    return [];
  }
}

export default async function CustomersPage() {
  const customers = await fetchCustomers();

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "32px 36px" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, color: "var(--olea-ink)", margin: 0 }}>Customers</h1>
        <p style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 4 }}>
          {customers.length} customers, derived from order history
        </p>
      </div>

      {customers.length === 0 ? (
        <div style={{ background: "#fff", borderRadius: 14, padding: "80px 20px", textAlign: "center", color: "var(--fg-2)", boxShadow: "var(--shadow-sm)" }}>
          <Users size={40} style={{ margin: "0 auto 16px", opacity: 0.3 }} />
          <p style={{ fontSize: 15, fontWeight: 600, color: "var(--olea-ink)" }}>No customers yet</p>
          <p style={{ fontSize: 13, marginTop: 6 }}>Customers appear here automatically once orders start coming in.</p>
        </div>
      ) : (
        <div style={{ background: "#fff", borderRadius: 14, boxShadow: "var(--shadow-sm)", border: "1px solid var(--border-subtle)", overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "var(--olea-green-50)", borderBottom: "1px solid var(--border-subtle)" }}>
                  {["Customer", "Contact", "Orders", "Lifetime Value", "Last Order"].map((h) => (
                    <th key={h} style={{ padding: "13px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-2)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {customers.map((c, i) => (
                  <tr key={c.email} style={{ borderBottom: i < customers.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 600 }}>{c.name}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ fontSize: 12.5 }}>{c.email}</div>
                      {c.phone && <div style={{ fontSize: 11.5, color: "var(--fg-2)" }}>{c.phone}</div>}
                    </td>
                    <td style={{ padding: "14px 16px" }}>{c.orderCount}</td>
                    <td style={{ padding: "14px 16px", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
                      ₦{c.totalSpent.toLocaleString("en-NG")}
                    </td>
                    <td style={{ padding: "14px 16px", color: "var(--fg-2)", fontSize: 12 }}>
                      {new Date(c.lastOrderAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
