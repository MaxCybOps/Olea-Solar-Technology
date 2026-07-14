import type { Metadata } from "next";
import { Mail, Phone, Calendar, Inbox } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase/admin";
import type { LeadRow } from "@/types/database";

export const metadata: Metadata = { title: "Leads & Inquiries" };
export const dynamic = "force-dynamic";

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  new:         { bg: "rgba(229,62,62,0.10)",  color: "#b53030",               label: "New" },
  read:        { bg: "rgba(249,166,6,0.15)",  color: "#8a5e00",               label: "Read" },
  replied:     { bg: "rgba(56,161,105,0.12)", color: "#1d6b3f",               label: "Replied" },
};

export default async function LeadsPage() {
  const { data, error } = await supabaseAdmin
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) console.error("Leads fetch error:", error);

  const leads = (data ?? []) as LeadRow[];
  const newCount = leads.filter((l) => l.status === "new").length;

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "32px 36px" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, color: "var(--olea-ink)", margin: 0 }}>Leads & Inquiries</h1>
        <p style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 4 }}>
          {leads.length} total · <span style={{ color: "#b53030", fontWeight: 600 }}>{newCount} new</span>
        </p>
      </div>

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 28 }}>
        {[
          { label: "New", value: newCount, color: "#b53030" },
          { label: "Read", value: leads.filter((l) => l.status === "read").length, color: "#8a5e00" },
          { label: "Replied", value: leads.filter((l) => l.status === "replied").length, color: "#1d6b3f" },
        ].map((s) => (
          <div key={s.label} style={{ background: "#fff", borderRadius: 12, padding: "16px 18px", boxShadow: "var(--shadow-sm)", border: "1px solid var(--border-subtle)" }}>
            <div style={{ fontSize: 26, fontWeight: 700, color: s.color, fontFamily: "var(--font-display)" }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "var(--fg-2)", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {leads.length === 0 ? (
        <div style={{ background: "#fff", borderRadius: 14, padding: "80px 20px", textAlign: "center", color: "var(--fg-2)", boxShadow: "var(--shadow-sm)" }}>
          <Inbox size={40} style={{ margin: "0 auto 16px", opacity: 0.3 }} />
          <p style={{ fontSize: 15, fontWeight: 600, color: "var(--olea-ink)" }}>No inquiries yet</p>
          <p style={{ fontSize: 13, marginTop: 6 }}>Contact form and quote requests will appear here.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {leads.map((lead) => {
            const s = STATUS_STYLES[lead.status] ?? STATUS_STYLES.new;
            return (
              <div key={lead.id} style={{ background: "#fff", borderRadius: 14, padding: 22, boxShadow: "var(--shadow-sm)", border: "1px solid var(--border-subtle)", display: "grid", gridTemplateColumns: "1fr auto", gap: 16, alignItems: "start" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 700, fontSize: 15, color: "var(--olea-ink)" }}>{lead.name}</span>
                    <span style={{ background: s.bg, color: s.color, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "2px 10px", borderRadius: 4 }}>{s.label}</span>
                    <span style={{ background: "var(--olea-green-50)", color: "var(--olea-green-700)", fontSize: 10, fontWeight: 600, padding: "2px 10px", borderRadius: 4, textTransform: "capitalize" }}>{lead.type}</span>
                  </div>

                  {lead.message && (
                    <p style={{ fontSize: 13.5, color: "var(--olea-ink)", lineHeight: 1.6, margin: "0 0 14px", fontStyle: "italic" }}>
                      "{lead.message}"
                    </p>
                  )}

                  <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--fg-2)" }}>
                      <Mail size={12} style={{ color: "var(--olea-green-600)" }} /> {lead.email}
                    </div>
                    {lead.phone && (
                      <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--fg-2)" }}>
                        <Phone size={12} style={{ color: "var(--olea-green-600)" }} /> {lead.phone}
                      </div>
                    )}
                    <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--fg-2)" }}>
                      <Calendar size={12} style={{ color: "var(--olea-green-600)" }} />
                      {new Date(lead.created_at).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <a href={`mailto:${lead.email}`} style={{ padding: "8px 16px", borderRadius: 8, background: "var(--accent)", color: "var(--olea-ink)", fontSize: 12, fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap", textAlign: "center" }}>
                    Reply
                  </a>
                  {lead.phone && (
                    <a href={`tel:${lead.phone}`} style={{ padding: "8px 16px", borderRadius: 8, border: "1.5px solid var(--border-subtle)", color: "var(--fg-2)", fontSize: 12, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap", textAlign: "center" }}>
                      Call
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
