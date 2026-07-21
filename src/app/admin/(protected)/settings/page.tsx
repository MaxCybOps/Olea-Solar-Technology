"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { LogOut, Mail, ShieldCheck } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);

  async function handleSignOut() {
    setSigningOut(true);
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "32px 36px" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, color: "var(--olea-ink)", margin: 0 }}>Settings</h1>
        <p style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 4 }}>Account and access</p>
      </div>

      <div style={{ background: "#fff", borderRadius: 14, boxShadow: "var(--shadow-sm)", border: "1px solid var(--border-subtle)", padding: 24, maxWidth: 480 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
          <Mail size={16} style={{ color: "var(--olea-green-700)" }} />
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--fg-2)" }}>Signed in as</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--olea-ink)" }}>{email ?? "Loading…"}</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <ShieldCheck size={16} style={{ color: "var(--olea-green-700)" }} />
          <div style={{ fontSize: 13, color: "var(--fg-2)" }}>
            Admin access is managed in Supabase → Authentication → Users.
          </div>
        </div>

        <button
          onClick={handleSignOut}
          disabled={signingOut}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 20px", borderRadius: 10, border: "1.5px solid rgba(229,62,62,0.3)", background: "#fff", color: "#c53030", fontSize: 13.5, fontWeight: 700, cursor: signingOut ? "not-allowed" : "pointer", fontFamily: "var(--font-sans)" }}
        >
          <LogOut size={15} /> {signingOut ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </div>
  );
}
