"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", location: "", interest: "", message: "", referral: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", phone: "", location: "", interest: "", message: "", referral: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 8,
    border: "1px solid var(--border-subtle)",
    fontSize: 15,
    fontFamily: "var(--font-sans)",
    background: "#fff",
    color: "var(--olea-ink)",
    outline: "none",
    transition: "border-color 200ms",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: "var(--olea-ink)",
    marginBottom: 8,
  };

  return (
    <>
      {/* Hero */}
      <section style={{ background: "var(--bg-dark)", color: "#fff", paddingTop: 160, paddingBottom: 80, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: "-5%", top: "10%", width: 400, height: 400, background: "radial-gradient(circle, rgba(249,166,6,0.12) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative" }}>
          <span className="eyebrow">Get In Touch</span>
          <h1 className="t-display" style={{ color: "#fff", margin: "0 0 20px", maxWidth: 620 }}>
            Let's talk about your<br />
            <span style={{ color: "var(--accent)" }}>energy future.</span>
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.72)", maxWidth: 520, lineHeight: 1.6 }}>
            We respond to every inquiry within 2 business hours. Because your energy future shouldn't wait.
          </p>
          <nav style={{ marginTop: 16, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.5)" }}>Home</Link>
            <span style={{ margin: "0 8px" }}>›</span>
            <span>Contact</span>
          </nav>
        </div>
      </section>

      {/* Form + Details */}
      <section className="section section-bg">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 48, alignItems: "start" }} className="contact-grid">
            {/* Form */}
            <div className="card" style={{ padding: 48 }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 8px", color: "var(--olea-ink)" }}>Send us a message</h2>
              <p style={{ fontSize: 15, color: "var(--fg-2)", margin: "0 0 32px" }}>Fill the form and we'll reach out within 2 business hours.</p>

              {status === "success" ? (
                <div style={{ background: "var(--olea-green-50)", border: "1px solid var(--olea-green-100)", borderRadius: 12, padding: 32, textAlign: "center" }}>
                  <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
                  <h3 style={{ fontWeight: 700, fontSize: 20, color: "var(--olea-green-800)", margin: "0 0 8px" }}>Message sent!</h3>
                  <p style={{ fontSize: 15, color: "var(--fg-2)" }}>We'll get back to you within 2 business hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="form-row">
                    <div>
                      <label style={labelStyle}>Full Name *</label>
                      <input style={inputStyle} type="text" value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} required placeholder="Your full name" onFocus={(e) => (e.target.style.borderColor = "var(--olea-green-600)")} onBlur={(e) => (e.target.style.borderColor = "var(--border-subtle)")} />
                    </div>
                    <div>
                      <label style={labelStyle}>Email Address *</label>
                      <input style={inputStyle} type="email" value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} required placeholder="you@example.com" onFocus={(e) => (e.target.style.borderColor = "var(--olea-green-600)")} onBlur={(e) => (e.target.style.borderColor = "var(--border-subtle)")} />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 20 }} className="form-row">
                    <div>
                      <label style={labelStyle}>Phone Number *</label>
                      <input style={inputStyle} type="tel" value={form.phone} onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))} required placeholder="+234 800 000 0000" onFocus={(e) => (e.target.style.borderColor = "var(--olea-green-600)")} onBlur={(e) => (e.target.style.borderColor = "var(--border-subtle)")} />
                    </div>
                    <div>
                      <label style={labelStyle}>Your Location</label>
                      <input style={inputStyle} type="text" value={form.location} onChange={(e) => setForm(f => ({ ...f, location: e.target.value }))} placeholder="City, State" onFocus={(e) => (e.target.style.borderColor = "var(--olea-green-600)")} onBlur={(e) => (e.target.style.borderColor = "var(--border-subtle)")} />
                    </div>
                  </div>

                  <div style={{ marginTop: 20 }}>
                    <label style={labelStyle}>I'm interested in</label>
                    <select
                      style={{ ...inputStyle, cursor: "pointer" }}
                      value={form.interest}
                      onChange={(e) => setForm(f => ({ ...f, interest: e.target.value }))}
                    >
                      <option value="">Select an option</option>
                      <option value="residential">Residential Solar System</option>
                      <option value="commercial">Commercial Solar System</option>
                      <option value="industrial">Industrial Energy Solution</option>
                      <option value="smart">Smart Energy Systems</option>
                      <option value="consulting">Energy Consulting</option>
                      <option value="product">Product Purchase</option>
                      <option value="other">Something Else</option>
                    </select>
                  </div>

                  <div style={{ marginTop: 20 }}>
                    <label style={labelStyle}>Message *</label>
                    <textarea
                      style={{ ...inputStyle, minHeight: 120, resize: "vertical" }}
                      value={form.message}
                      onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                      required
                      placeholder="Tell us about your project or what you need..."
                      onFocus={(e) => (e.target.style.borderColor = "var(--olea-green-600)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border-subtle)")}
                    />
                  </div>

                  <div style={{ marginTop: 20 }}>
                    <label style={labelStyle}>How did you hear about us?</label>
                    <select style={{ ...inputStyle, cursor: "pointer" }} value={form.referral} onChange={(e) => setForm(f => ({ ...f, referral: e.target.value }))}>
                      <option value="">Select (optional)</option>
                      <option value="google">Google Search</option>
                      <option value="social">Social Media</option>
                      <option value="referral">Friend / Colleague</option>
                      <option value="ad">Advertisement</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {status === "error" && (
                    <p style={{ color: "var(--olea-danger)", fontSize: 14, marginTop: 12 }}>Something went wrong. Please try again.</p>
                  )}

                  <button type="submit" disabled={status === "loading"} className="btn btn-primary" style={{ marginTop: 28, width: "100%", justifyContent: "center" }}>
                    {status === "loading" ? "Sending..." : "Send Message →"}
                  </button>
                </form>
              )}
            </div>

            {/* Contact details */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { icon: <MapPin size={20} />, title: "Office Address", body: "No. 1 Clean Energy Avenue,\nOwambe Business District,\nOwerri, Imo State, Nigeria" },
                { icon: <Phone size={20} />, title: "Phone Number", body: "+234 800 000 0000" },
                { icon: <Mail size={20} />, title: "Email", body: "hello@oleatechnologies.com" },
                { icon: <Clock size={20} />, title: "Business Hours", body: "Mon–Fri: 8AM – 6PM\nSaturday: 9AM – 2PM" },
              ].map((item) => (
                <div key={item.title} className="card" style={{ padding: 24, display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: "var(--olea-green-50)", color: "var(--olea-green-600)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: "var(--olea-ink)", marginBottom: 6 }}>{item.title}</div>
                    <div style={{ fontSize: 14, color: "var(--fg-2)", lineHeight: 1.6, whiteSpace: "pre-line" }}>{item.body}</div>
                  </div>
                </div>
              ))}

              <div className="card" style={{ padding: 24, background: "var(--bg-dark)", color: "#fff" }}>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.72)", lineHeight: 1.6, margin: "0 0 16px" }}>
                  Need an immediate answer? Our AI assistant is available 24/7.
                </p>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    const btn = document.getElementById("olea-chat-trigger");
                    if (btn) btn.click();
                  }}
                >
                  Chat with AI Assistant →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row     { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
