import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Wrench, Edit2 } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase/admin";
import type { InstallationRow } from "@/types/database";

export const metadata: Metadata = { title: "Installations" };
export const dynamic = "force-dynamic";

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  scheduled:   { bg: "rgba(249,166,6,0.15)",  color: "#8a5e00" },
  in_progress: { bg: "rgba(26,122,74,0.12)",  color: "var(--olea-green-700)" },
  completed:   { bg: "rgba(56,161,105,0.12)", color: "#1d6b3f" },
  cancelled:   { bg: "rgba(229,62,62,0.08)",  color: "#b53030" },
};

async function fetchInstallations(): Promise<InstallationRow[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from("installations")
      .select("*")
      .order("scheduled_date", { ascending: true, nullsFirst: false });
    if (error || !data) return [];
    return data as unknown as InstallationRow[];
  } catch {
    return [];
  }
}

export default async function InstallationsPage() {
  const installations = await fetchInstallations();
  const scheduled = installations.filter((i) => i.status === "scheduled").length;
  const inProgress = installations.filter((i) => i.status === "in_progress").length;
  const completed = installations.filter((i) => i.status === "completed").length;

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "32px 36px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, color: "var(--olea-ink)", margin: 0 }}>Installations</h1>
          <p style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 4 }}>{installations.length} jobs · {scheduled} scheduled · {inProgress} in progress · {completed} completed</p>
        </div>
        <Link href="/admin/installations/new" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--olea-green-900)", color: "#fff", padding: "11px 20px", borderRadius: 10, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
          <Plus size={16} /> Schedule Installation
        </Link>
      </div>

      <div style={{ background: "#fff", borderRadius: 14, boxShadow: "var(--shadow-sm)", border: "1px solid var(--border-subtle)", overflow: "hidden" }}>
        {installations.length === 0 ? (
          <div style={{ padding: "80px 20px", textAlign: "center", color: "var(--fg-2)" }}>
            <Wrench size={40} style={{ margin: "0 auto 16px", opacity: 0.3 }} />
            <p style={{ fontSize: 15, fontWeight: 600, color: "var(--olea-ink)" }}>No installations scheduled</p>
            <p style={{ fontSize: 13, marginTop: 6 }}>Schedule a job to start tracking on-site installs here.</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "var(--olea-green-50)", borderBottom: "1px solid var(--border-subtle)" }}>
                  {["Customer", "Address", "Scheduled", "Technician", "Status", ""].map((h) => (
                    <th key={h} style={{ padding: "13px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-2)", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {installations.map((inst, i) => {
                  const s = STATUS_STYLES[inst.status] ?? { bg: "#eee", color: "#666" };
                  return (
                    <tr key={inst.id} style={{ borderBottom: i < installations.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ fontWeight: 600 }}>{inst.customer_name}</div>
                        {inst.customer_phone && <div style={{ fontSize: 11.5, color: "var(--fg-2)" }}>{inst.customer_phone}</div>}
                      </td>
                      <td style={{ padding: "14px 16px", color: "var(--fg-2)", maxWidth: 240 }}>{inst.address}</td>
                      <td style={{ padding: "14px 16px", color: "var(--fg-2)", whiteSpace: "nowrap" }}>
                        {inst.scheduled_date ? new Date(inst.scheduled_date).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                      </td>
                      <td style={{ padding: "14px 16px", color: "var(--fg-2)" }}>{inst.technician_name ?? "Unassigned"}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{ background: s.bg, color: s.color, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 4, whiteSpace: "nowrap" }}>
                          {inst.status.replace("_", " ")}
                        </span>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <Link href={`/admin/installations/${inst.id}`} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: "var(--olea-green-700)", background: "var(--olea-green-50)", padding: "6px 12px", borderRadius: 6, textDecoration: "none" }}>
                          <Edit2 size={13} /> Edit
                        </Link>
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
