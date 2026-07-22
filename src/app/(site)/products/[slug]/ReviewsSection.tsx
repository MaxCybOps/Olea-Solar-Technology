"use client";

import { useState } from "react";
import { Star, CheckCircle2, Loader2 } from "lucide-react";
import type { ReviewRow } from "@/types/database";

export default function ReviewsSection({ productId, reviews }: { productId: string; reviews: ReviewRow[] }) {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const avgRating = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || body.trim().length < 10) { setError("Please add your name and a review of at least 10 characters."); return; }
    setSubmitting(true);
    setError("");

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, customerName: name, customerEmail: email, rating, title, body }),
    });

    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      setError(json.error ?? "Failed to submit review. Please try again.");
      setSubmitting(false);
      return;
    }

    setSubmitted(true);
    setSubmitting(false);
  }

  return (
    <section style={{ background: "var(--bg-page)", padding: "64px 0" }}>
      <div className="container-narrow">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(22px, 2.6vw, 30px)", margin: "0 0 6px", color: "var(--olea-ink)" }}>
              Customer Reviews
            </h2>
            {reviews.length > 0 ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "var(--accent)", fontSize: 16, letterSpacing: 2 }}>
                  {"★".repeat(Math.round(avgRating))}{"☆".repeat(5 - Math.round(avgRating))}
                </span>
                <span style={{ fontSize: 13.5, color: "var(--fg-2)" }}>{avgRating.toFixed(1)} out of 5 · {reviews.length} review{reviews.length !== 1 ? "s" : ""}</span>
              </div>
            ) : (
              <p style={{ fontSize: 14, color: "var(--fg-2)", margin: 0 }}>No reviews yet, be the first to share your experience.</p>
            )}
          </div>
          {!showForm && !submitted && (
            <button onClick={() => setShowForm(true)} className="btn btn-outline-dark">
              Write a Review
            </button>
          )}
        </div>

        {/* Submission form */}
        {showForm && !submitted && (
          <form onSubmit={handleSubmit} style={{ background: "#fff", borderRadius: 14, padding: 26, boxShadow: "var(--shadow-sm)", marginBottom: 36, border: "1px solid var(--border-subtle)" }}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg-2)", marginBottom: 8 }}>Your Rating</label>
              <div style={{ display: "flex", gap: 4 }}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} type="button" onClick={() => setRating(n)} onMouseEnter={() => setHoverRating(n)} onMouseLeave={() => setHoverRating(0)} style={{ background: "transparent", border: "none", cursor: "pointer", padding: 2 }}>
                    <Star size={26} fill={(hoverRating || rating) >= n ? "var(--accent)" : "none"} color={(hoverRating || rating) >= n ? "var(--accent)" : "var(--border-subtle)"} />
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }} className="review-form-grid">
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg-2)", marginBottom: 6 }}>Name *</label>
                <input value={name} onChange={(e) => setName(e.target.value)} required style={{ width: "100%", padding: "10px 14px", border: "1.5px solid var(--border-subtle)", borderRadius: 8, fontSize: 14, fontFamily: "var(--font-sans)", outline: "none", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg-2)", marginBottom: 6 }}>Email (optional)</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: "10px 14px", border: "1.5px solid var(--border-subtle)", borderRadius: 8, fontSize: 14, fontFamily: "var(--font-sans)", outline: "none", boxSizing: "border-box" }} />
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg-2)", marginBottom: 6 }}>Title (optional)</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Sum up your experience" style={{ width: "100%", padding: "10px 14px", border: "1.5px solid var(--border-subtle)", borderRadius: 8, fontSize: 14, fontFamily: "var(--font-sans)", outline: "none", boxSizing: "border-box" }} />
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg-2)", marginBottom: 6 }}>Your Review *</label>
              <textarea value={body} onChange={(e) => setBody(e.target.value)} required style={{ width: "100%", height: 100, padding: "10px 14px", border: "1.5px solid var(--border-subtle)", borderRadius: 8, fontSize: 14, fontFamily: "var(--font-sans)", outline: "none", resize: "vertical", boxSizing: "border-box" }} placeholder="What did you like? How was installation and support?" />
            </div>

            {error && <p style={{ color: "#c53030", fontSize: 13, marginBottom: 14 }}>{error}</p>}

            <div style={{ display: "flex", gap: 10 }}>
              <button type="submit" disabled={submitting} className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                {submitting && <Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} />}
                {submitting ? "Submitting…" : "Submit Review"}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="btn btn-outline-dark">Cancel</button>
            </div>
          </form>
        )}

        {submitted && (
          <div style={{ background: "rgba(56,161,105,0.08)", border: "1px solid rgba(56,161,105,0.25)", borderRadius: 14, padding: 24, marginBottom: 36, display: "flex", alignItems: "center", gap: 14 }}>
            <CheckCircle2 size={26} style={{ color: "#1d6b3f", flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "var(--olea-ink)" }}>Thanks for your review!</div>
              <div style={{ fontSize: 13.5, color: "var(--fg-2)", marginTop: 2 }}>It's pending approval and will appear here once our team reviews it.</div>
            </div>
          </div>
        )}

        {/* Existing reviews */}
        {reviews.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {reviews.map((r) => (
              <div key={r.id} style={{ background: "#fff", borderRadius: 14, padding: 22, boxShadow: "var(--shadow-sm)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: "var(--olea-ink)" }}>{r.customer_name}</span>
                  <span style={{ color: "var(--accent)", fontSize: 13, letterSpacing: 2 }}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                  {r.is_verified && (
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#1d6b3f", background: "rgba(56,161,105,0.12)", padding: "2px 8px", borderRadius: 4 }}>Verified</span>
                  )}
                </div>
                {r.title && <div style={{ fontWeight: 600, fontSize: 14, color: "var(--olea-ink)", marginBottom: 4 }}>{r.title}</div>}
                <p style={{ fontSize: 14, color: "var(--fg-1)", lineHeight: 1.6, margin: 0 }}>{r.body}</p>
                {r.admin_response && (
                  <div style={{ marginTop: 12, padding: "12px 14px", background: "var(--olea-green-50)", borderRadius: 8, borderLeft: "3px solid var(--olea-green-600)" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "var(--olea-green-700)", marginBottom: 4 }}>OLEA RESPONSE</div>
                    <p style={{ fontSize: 13, color: "var(--fg-1)", margin: 0, lineHeight: 1.55 }}>{r.admin_response}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 560px) { .review-form-grid { grid-template-columns: 1fr !important; } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
