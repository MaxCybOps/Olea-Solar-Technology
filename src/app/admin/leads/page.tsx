import type { Metadata } from "next";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";

export const metadata: Metadata = { title: "Leads" };

const LEADS = [
  { id: "L001", name: "Uchenna Obi",     email: "uchenna@obi.ng",    phone: "08011223344", location: "Enugu",         interest: "Home system",     message: "3-bedroom house. Currently spending ₦80k/month on diesel. Want to go solar.", date: "Jun 1, 2026",  status: "new" },
  { id: "L002", name: "Kemi Adesanya",   email: "kemi.a@biz.ng",     phone: "08022334455", location: "Lagos (VI)",    interest: "Commercial",      message: "Office building, 8 floors. Need to eliminate generator reliance.", date: "Jun 1, 2026",  status: "in_progress" },
  { id: "L003", name: "Ahmed Musa",      email: "ahmed@factory.ng",  phone: "08033445566", location: "Kano",          interest: "Industrial",      message: "Textile factory. 3-phase power. Need 50KVA+. Looking for a full assessment.", date: "May 31, 2026", status: "new" },
  { id: "L004", name: "Blessing Okafor", email: "blessing@gmail.com", phone: "08044556677", location: "Port Harcourt", interest: "Home system",     message: "Small bungalow. Interested in 5KVA system with battery backup.", date: "May 30, 2026", status: "resolved" },
  { id: "L005", name: "Tunde Bakare",    email: "tunde.b@corp.ng",   phone: "08055667788", location: "Abuja",         interest: "Consulting",      message: "New commercial development. Want energy audit and system design before construction.", date: "May 29, 2026", status: "in_progress" },
  { id: "L006", name: "Ifeoma Chukwu",  email: "ifeoma@school.edu", phone: "08066778899", location: "Owerri",        interest: "Education",       message: "Secondary school, 12 classrooms. Want to power lights and fans 8hr/day.", date: "May 28, 2026", status: "new" },
];

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  new:         { bg: "rgba(26,122,74,0.12)",  color: "var(--olea-green-700)", label: "New" },
  in_progress: { bg: "rgba(249,166,6,0.15)",  color: "#8a5e00",               label: "In Progress" },
  resolved:    { bg: "rgba(56,161,105,0.12)", color: "#1d6b3f",               label: "Resolved" },
};

export default function LeadsPage() {
  const newCount = LEADS.filter((l) => l.status === "new").length;

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontWeight: 700, fontSize: 22, margin: "0 0 4px", color: "var(--olea-ink)" }}>Leads & Inquiries</h1>
        <p style={{ fontSize: 13, color: "var(--fg-2)", margin: 0 }}>{LEADS.length} total · <strong style={{ color: "var(--olea-green-700)" }}>{newCount} new</strong></p>
      </div>

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 24 }} className="leads-kpi">
        {[
          { label: "New leads", value: newCount, color: "var(--olea-green-600)", bg: "rgba(26,122,74,0.08)" },
          { label: "In progress", value: LEADS.filter(l => l.status === "in_progress").length, color: "#c88a00", bg: "rgba(249,166,6,0.10)" },
          { label: "Resolved", value: LEADS.filter(l => l.status === "resolved").length, color: "#1d6b3f", bg: "rgba(56,161,105,0.10)" },
        ].map((k) => (
          <div key={k.label} style={{ background: "#fff", borderRadius: 12, padding: 18, boxShadow: "var(--shadow-sm)", borderLeft: `3px solid ${k.color}` }}>
            <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "var(--font-display)", color: k.color }}>{k.value}</div>
            <div style={{ fontSize: 12, color: "var(--fg-2)", marginTop: 2 }}>{k.label}</div>
          </div>
        ))}
      </div>

      {/* Lead cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {LEADS.map((lead) => {
          const s = STATUS_STYLES[lead.status];
          return (
            <div key={lead.id} style={{ background: "#fff", borderRadius: 12, padding: 22, boxShadow: "var(--shadow-sm)", display: "grid", gridTemplateColumns: "1fr auto", gap: 16, alignItems: "start" }} className="lead-card">
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 700, fontSize: 15, color: "var(--olea-ink)" }}>{lead.name}</span>
                  <span style={{ background: s.bg, color: s.color, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "2px 10px", borderRadius: 4 }}>{s.label}</span>
                  {lead.interest && (
                    <span style={{ background: "var(--olea-green-50)", color: "var(--olea-green-700)", fontSize: 10.5, fontWeight: 600, padding: "2px 10px", borderRadius: 4 }}>{lead.interest}</span>
                  )}
                </div>

                <p style={{ fontSize: 13.5, color: "var(--olea-ink)", lineHeight: 1.55, margin: "0 0 14px", fontStyle: "italic" }}>
                  "{lead.message}"
                </p>

                <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                  {[
                    { icon: Mail, text: lead.email },
                    { icon: Phone, text: lead.phone },
                    { icon: MapPin, text: lead.location },
                    { icon: Calendar, text: lead.date },
                  ].map(({ icon: I, text }) => (
                    <div key={text} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--fg-2)" }}>
                      <I size={12} style={{ color: "var(--olea-green-600)", flexShrink: 0 }} />
                      {text}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                <a href={`mailto:${lead.email}`} style={{ padding: "8px 14px", borderRadius: 8, background: "var(--accent)", color: "var(--olea-ink)", fontSize: 12, fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" }}>
                  Reply
                </a>
                <a href={`tel:${lead.phone}`} style={{ padding: "8px 14px", borderRadius: 8, border: "1.5px solid var(--border-subtle)", color: "var(--fg-2)", fontSize: 12, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}>
                  Call
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .leads-kpi  { grid-template-columns: 1fr !important; }
          .lead-card  { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
