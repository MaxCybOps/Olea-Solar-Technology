"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Zap, Shield, Clock } from "lucide-react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div style={{ display: "flex", minHeight: "100svh" }}>

      {/* ── Left panel ── */}
      <div style={{
        flex: "0 0 50%",
        position: "relative",
        background: "var(--olea-green-900)",
        display: "flex",
        flexDirection: "column",
        padding: "32px 48px",
        overflow: "hidden",
      }} className="sign-in-left">

        {/* Background photo */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src="/images/hero-poster.jpg"
            alt=""
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(7,41,31,0.88) 0%, rgba(7,41,31,0.70) 100%)" }} />
        </div>

        {/* Logo */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <Link href="/">
            <Image src="/images/logo-white.png" alt="Olea Technologies" width={120} height={34} style={{ height: 34, width: "auto" }} />
          </Link>
        </div>

        {/* Center copy */}
        <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 40 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 16, display: "block" }}>
            Powering Africa&apos;s Future
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(28px, 3.2vw, 44px)", lineHeight: 1.08, color: "#fff", margin: "0 0 20px", letterSpacing: "-0.02em" }}>
            Welcome back<br />to Olea.
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.68)", lineHeight: 1.6, maxWidth: 360 }}>
            Sign in to manage your orders, systems, and assessments.
          </p>
        </div>

        {/* Trust strip */}
        <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 28, flexWrap: "wrap" }}>
          {[
            { icon: Zap, text: "500+ installs" },
            { icon: Shield, text: "25-yr warranty" },
            { icon: Clock, text: "2-hr response" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>
              <Icon size={15} style={{ color: "var(--accent)" }} />
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel ── */}
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--olea-bg)",
        padding: "48px 32px",
      }} className="sign-in-right">

        <div style={{ width: "100%", maxWidth: 400 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 30, color: "var(--olea-ink)", margin: "0 0 6px" }}>
            Sign in
          </h2>
          <p style={{ fontSize: 14.5, color: "var(--fg-2)", margin: "0 0 32px" }}>
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" style={{ color: "var(--olea-gold-600)", fontWeight: 600 }}>
              Create one
            </Link>
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {/* Email */}
            <div>
              <label style={{ display: "block", fontSize: 13.5, fontWeight: 600, color: "var(--olea-ink)", marginBottom: 6 }}>
                Email
              </label>
              <div style={{ position: "relative" }}>
                <svg viewBox="0 0 20 20" fill="currentColor" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "var(--fg-2)" }}>
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  style={{ width: "100%", padding: "12px 14px 12px 42px", borderRadius: 10, border: "1.5px solid var(--border-subtle)", fontSize: 14.5, background: "#fff", color: "var(--olea-ink)", fontFamily: "var(--font-sans)", outline: "none", transition: "border-color 200ms ease" }}
                  onFocus={(e) => e.target.style.borderColor = "var(--olea-green-600)"}
                  onBlur={(e) => e.target.style.borderColor = "var(--border-subtle)"}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ display: "block", fontSize: 13.5, fontWeight: 600, color: "var(--olea-ink)", marginBottom: 6 }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <svg viewBox="0 0 20 20" fill="currentColor" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "var(--fg-2)" }}>
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                </svg>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ width: "100%", padding: "12px 14px 12px 42px", borderRadius: 10, border: "1.5px solid var(--border-subtle)", fontSize: 14.5, background: "#fff", color: "var(--olea-ink)", fontFamily: "var(--font-sans)", outline: "none", transition: "border-color 200ms ease" }}
                  onFocus={(e) => e.target.style.borderColor = "var(--olea-green-600)"}
                  onBlur={(e) => e.target.style.borderColor = "var(--border-subtle)"}
                />
              </div>
            </div>

            {/* Remember + Forgot */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--fg-2)", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  style={{ width: 15, height: 15, accentColor: "var(--olea-green-700)", cursor: "pointer" }}
                />
                Remember me
              </label>
              <Link href="/forgot-password" style={{ fontSize: 13.5, color: "var(--olea-gold-600)", fontWeight: 600 }}>
                Forgot password?
              </Link>
            </div>

            {/* Sign In button */}
            <button
              type="submit"
              disabled={loading}
              style={{ background: "var(--accent)", color: "var(--olea-ink)", border: "none", borderRadius: 9999, padding: "14px 24px", fontSize: 15, fontWeight: 700, cursor: loading ? "default" : "pointer", fontFamily: "var(--font-sans)", width: "100%", opacity: loading ? 0.75 : 1, transition: "opacity 200ms ease" }}
            >
              {loading ? "Signing in…" : "Sign In →"}
            </button>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, color: "var(--fg-2)", fontSize: 13 }}>
              <div style={{ flex: 1, height: 1, background: "var(--border-subtle)" }} />
              OR
              <div style={{ flex: 1, height: 1, background: "var(--border-subtle)" }} />
            </div>

            {/* Google */}
            <button
              type="button"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: "#fff", color: "var(--olea-ink)", border: "1.5px solid var(--border-subtle)", borderRadius: 9999, padding: "13px 24px", fontSize: 14.5, fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-sans)", width: "100%", transition: "border-color 200ms ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--olea-green-600)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-subtle)")}
            >
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .sign-in-left { display: none !important; }
          .sign-in-right { padding: 40px 20px !important; }
        }
      `}</style>
    </div>
  );
}
