"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--olea-green-900)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Image src="/images/logo-white.png" alt="Olea Technologies" width={160} height={48} style={{ height: 48, width: "auto", margin: "0 auto" }} />
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginTop: 10 }}>Admin Dashboard</p>
        </div>

        {/* Card */}
        <div style={{ background: "#fff", borderRadius: 20, padding: "36px 32px", boxShadow: "0 24px 64px rgba(0,0,0,0.3)" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, color: "var(--olea-ink)", margin: "0 0 6px" }}>
            Sign in
          </h1>
          <p style={{ fontSize: 14, color: "var(--fg-2)", margin: "0 0 28px" }}>
            Access the Olea admin panel
          </p>

          {error && (
            <div style={{ background: "rgba(229,62,62,0.08)", border: "1px solid rgba(229,62,62,0.25)", borderRadius: 8, padding: "12px 16px", marginBottom: 20, fontSize: 13, color: "#c53030" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--olea-ink)", marginBottom: 6 }}>
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@oleatechnologies.com"
                style={{ width: "100%", padding: "12px 14px", border: "1.5px solid var(--border-subtle)", borderRadius: 10, fontSize: 14, fontFamily: "var(--font-sans)", color: "var(--olea-ink)", outline: "none", boxSizing: "border-box", background: "#fff" }}
                onFocus={(e) => (e.target.style.borderColor = "var(--olea-green-600)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border-subtle)")}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--olea-ink)", marginBottom: 6 }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  style={{ width: "100%", padding: "12px 44px 12px 14px", border: "1.5px solid var(--border-subtle)", borderRadius: 10, fontSize: 14, fontFamily: "var(--font-sans)", color: "var(--olea-ink)", outline: "none", boxSizing: "border-box", background: "#fff" }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--olea-green-600)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border-subtle)")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "transparent", border: "none", cursor: "pointer", color: "var(--fg-2)", display: "flex", padding: 0 }}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ marginTop: 8, width: "100%", padding: "13px", borderRadius: 10, border: "none", background: loading ? "var(--olea-gray-200)" : "var(--olea-green-900)", color: loading ? "var(--fg-2)" : "#fff", fontWeight: 700, fontSize: 15, cursor: loading ? "not-allowed" : "pointer", fontFamily: "var(--font-sans)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 200ms" }}
            >
              {loading && <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />}
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", marginTop: 24, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
          Olea Technologies · Admin access only
        </p>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
