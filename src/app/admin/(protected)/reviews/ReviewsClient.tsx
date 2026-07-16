"use client";

import { useState } from "react";
import { Check, X, ShieldCheck, MessageSquare, Loader2 } from "lucide-react";

interface Review {
  id: string;
  product_id: string;
  customer_name: string;
  customer_email: string | null;
  rating: number;
  title: string | null;
  body: string;
  is_approved: boolean;
  is_verified: boolean;
  admin_response: string | null;
  created_at: string;
  products: { name: string } | null;
}

export default function ReviewsClient({ reviews: initial }: { reviews: Review[] }) {
  const [reviews, setReviews]   = useState(initial);
  const [filter, setFilter]     = useState<"all" | "pending" | "approved">("pending");
  const [responding, setResponding] = useState<string | null>(null);
  const [responseText, setResponseText] = useState("");
  const [busy, setBusy]         = useState<string | null>(null);

  const filtered = reviews.filter((r) =>
    filter === "all" ? true : filter === "pending" ? !r.is_approved : r.is_approved
  );

  async function approve(id: string) {
    setBusy(id);
    await fetch(`/api/admin/reviews/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ is_approved: true }) });
    setReviews((prev) => prev.map((r) => r.id === id ? { ...r, is_approved: true } : r));
    setBusy(null);
  }

  async function reject(id: string) {
    if (!confirm("Delete this review? This cannot be undone.")) return;
    setBusy(id);
    await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
    setReviews((prev) => prev.filter((r) => r.id !== id));
    setBusy(null);
  }

  async function toggleVerified(id: string, current: boolean) {
    setBusy(id);
    await fetch(`/api/admin/reviews/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ is_verified: !current }) });
    setReviews((prev) => prev.map((r) => r.id === id ? { ...r, is_verified: !current } : r));
    setBusy(null);
  }

  async function saveResponse(id: string) {
    setBusy(id);
    const admin_response = responseText.trim() || null;
    await fetch(`/api/admin/reviews/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ admin_response }) });
    setReviews((prev) => prev.map((r) => r.id === id ? { ...r, admin_response } : r));
    setResponding(null);
    setResponseText("");
    setBusy(null);
  }

  return (
    <div>
      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {(["pending", "approved", "all"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: "8px 18px", borderRadius: 8, border: "1.5px solid", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-sans)", background: filter === f ? "var(--olea-green-900)" : "#fff", borderColor: filter === f ? "var(--olea-green-900)" : "var(--border-subtle)", color: filter === f ? "#fff" : "var(--olea-ink)", textTransform: "capitalize" }}>
            {f} {f === "pending" ? `(${reviews.filter((r) => !r.is_approved).length})` : f === "approved" ? `(${reviews.filter((r) => r.is_approved).length})` : `(${reviews.length})`}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {filtered.map((r) => (
          <div key={r.id} style={{ background: "#fff", borderRadius: 14, padding: 22, boxShadow: "var(--shadow-sm)", border: `1px solid ${r.is_approved ? "var(--border-subtle)" : "rgba(249,166,6,0.4)"}` }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <div style={{ flex: 1 }}>
                {/* Product */}
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--olea-green-600)", marginBottom: 6 }}>
                  {(r.products as { name: string } | null)?.name ?? "Unknown product"}
                </div>
                {/* Customer + rating */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: "var(--olea-ink)" }}>{r.customer_name}</span>
                  {r.customer_email && <span style={{ fontSize: 12, color: "var(--fg-2)" }}>{r.customer_email}</span>}
                  <span style={{ color: "var(--accent)", fontSize: 14, letterSpacing: 2 }}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                  {r.is_verified && (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 700, color: "#1d6b3f", background: "rgba(56,161,105,0.12)", padding: "2px 8px", borderRadius: 4 }}>
                      <ShieldCheck size={11} /> Verified
                    </span>
                  )}
                </div>
                {r.title && <div style={{ fontWeight: 600, fontSize: 14, color: "var(--olea-ink)", marginBottom: 4 }}>{r.title}</div>}
                <p style={{ fontSize: 14, color: "var(--fg-1)", lineHeight: 1.6, margin: 0 }}>{r.body}</p>

                {/* Admin response */}
                {r.admin_response && (
                  <div style={{ marginTop: 12, padding: "12px 14px", background: "var(--olea-green-50)", borderRadius: 8, borderLeft: "3px solid var(--olea-green-600)" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "var(--olea-green-700)", marginBottom: 4 }}>OLEA RESPONSE</div>
                    <p style={{ fontSize: 13, color: "var(--fg-1)", margin: 0, lineHeight: 1.55 }}>{r.admin_response}</p>
                  </div>
                )}

                {/* Response form */}
                {responding === r.id && (
                  <div style={{ marginTop: 12 }}>
                    <textarea
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      placeholder="Write your response to this review…"
                      style={{ width: "100%", padding: "10px 12px", border: "1.5px solid var(--border-subtle)", borderRadius: 8, fontSize: 13, fontFamily: "var(--font-sans)", resize: "vertical", minHeight: 80, boxSizing: "border-box", outline: "none" }}
                    />
                    <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                      <button onClick={() => saveResponse(r.id)} disabled={busy === r.id} style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: "var(--olea-green-900)", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-sans)", display: "flex", alignItems: "center", gap: 6 }}>
                        {busy === r.id && <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} />} Save Response
                      </button>
                      <button onClick={() => { setResponding(null); setResponseText(""); }} style={{ padding: "8px 16px", borderRadius: 8, border: "1.5px solid var(--border-subtle)", background: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-sans)", color: "var(--fg-2)" }}>
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <div style={{ fontSize: 11, color: "var(--fg-2)", marginTop: 10 }}>
                  {new Date(r.created_at).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })}
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}>
                {!r.is_approved && (
                  <button onClick={() => approve(r.id)} disabled={busy === r.id} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, border: "none", background: "rgba(56,161,105,0.12)", color: "#1d6b3f", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-sans)" }}>
                    {busy === r.id ? <Loader2 size={12} style={{ animation: "spin 1s linear infinite" }} /> : <Check size={13} />} Approve
                  </button>
                )}
                <button onClick={() => reject(r.id)} disabled={busy === r.id} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, border: "1.5px solid rgba(229,62,62,0.3)", background: "#fff", color: "#c53030", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-sans)" }}>
                  <X size={13} /> Delete
                </button>
                <button onClick={() => toggleVerified(r.id, r.is_verified)} disabled={busy === r.id} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, border: "1.5px solid var(--border-subtle)", background: r.is_verified ? "rgba(56,161,105,0.08)" : "#fff", color: r.is_verified ? "#1d6b3f" : "var(--fg-2)", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-sans)" }}>
                  <ShieldCheck size={13} /> {r.is_verified ? "Verified ✓" : "Mark Verified"}
                </button>
                <button onClick={() => { setResponding(r.id); setResponseText(r.admin_response ?? ""); }} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, border: "1.5px solid var(--border-subtle)", background: "#fff", color: "var(--olea-green-700)", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-sans)" }}>
                  <MessageSquare size={13} /> Respond
                </button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{ padding: "60px 20px", textAlign: "center", color: "var(--fg-2)", background: "#fff", borderRadius: 14, boxShadow: "var(--shadow-sm)" }}>
            No {filter === "pending" ? "pending" : filter === "approved" ? "approved" : ""} reviews.
          </div>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
