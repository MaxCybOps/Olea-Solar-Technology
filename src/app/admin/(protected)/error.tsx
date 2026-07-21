"use client";

import { AlertTriangle } from "lucide-react";

export default function AdminError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
      <div style={{ textAlign: "center", maxWidth: 440 }}>
        <AlertTriangle size={36} style={{ color: "#c53030", margin: "0 auto 16px" }} />
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--olea-ink)", margin: "0 0 8px" }}>
          Something went wrong loading this page
        </h2>
        <p style={{ fontSize: 13.5, color: "var(--fg-2)", margin: "0 0 20px", lineHeight: 1.6 }}>
          {error.message || "An unexpected error occurred."}
        </p>
        <button
          onClick={reset}
          style={{ padding: "10px 20px", borderRadius: 10, border: "none", background: "var(--olea-green-900)", color: "#fff", fontSize: 13.5, fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-sans)" }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
