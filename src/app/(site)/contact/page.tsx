"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Zap } from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "", phone: "", email: "", interest: "", message: "",
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
      setForm({ name: "", phone: "", email: "", interest: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const field: React.CSSProperties = {
    width: "100%",
    padding: "13px 16px",
    borderRadius: 10,
    border: "1.5px solid var(--border-subtle)",
    fontSize: 14.5,
    fontFamily: "var(--font-sans)",
    background: "#fff",
    color: "var(--olea-ink)",
    outline: "none",
    transition: "border-color 180ms",
    boxSizing: "border-box",
  };

  const label: React.CSSProperties = {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: "var(--olea-ink)",
    marginBottom: 6,
  };

  const INFO = [
    { icon: <MapPin size={18} />, label: "Headquarters", value: "Owerri, Imo State, Nigeria" },
    { icon: <Phone size={18} />,  label: "Call us",       value: "+234 800 OLEA NOW"         },
    { icon: <Mail size={18} />,   label: "Email",         value: "hello@oleatechnologies.com" },
    { icon: <Clock size={18} />,  label: "Hours",         value: "Mon–Sat  8am – 6pm WAT"    },
  ];

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ position: "relative", background: "var(--olea-green-900)", color: "#fff", paddingTop: 160, paddingBottom: 88, overflow: "hidden", minHeight: 460 }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src="/images/services/mnt.jpg"
            alt=""
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(7,41,31,0.90) 0%, rgba(7,41,31,0.65) 100%)" }} />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <nav style={{ fontSize: 13, color: "rgba(255,255,255,0.50)", marginBottom: 28 }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.50)" }}>Home</Link>
            <span style={{ margin: "0 8px" }}>›</span>
            <span>Contact</span>
          </nav>
          <span className="eyebrow">Get In Touch</span>
          <h1 className="t-display" style={{ color: "#fff", margin: "0 0 22px", maxWidth: 720, lineHeight: 1.06 }}>
            Let&apos;s talk about<br />
            your <span style={{ color: "var(--accent)" }}>power.</span>
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.70)", maxWidth: 660, lineHeight: 1.7, margin: 0 }}>
            Tell us what you&apos;re running and where. We respond to every inquiry within 2 business hours, because your energy future shouldn&apos;t wait.
          </p>
        </div>
      </section>

      {/* ── BODY ── */}
      <section className="section section-bg">
        <div className="container">
          <div className="contact-grid">

            {/* LEFT, Info */}
            <div>
              <span className="eyebrow">Reach Us</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(22px, 2.4vw, 32px)", color: "var(--olea-ink)", margin: "0 0 36px", lineHeight: 1.15 }}>
                Speak to a real<br />energy expert.
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 32 }}>
                {INFO.map((item) => (
                  <div key={item.label} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: 10,
                      background: "var(--olea-green-50)",
                      color: "var(--olea-green-700)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--fg-2)", marginBottom: 2 }}>{item.label}</div>
                      <div style={{ fontSize: 15, fontWeight: 500, color: "var(--olea-ink)", lineHeight: 1.4 }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 2-hour promise */}
              <div style={{ background: "var(--olea-green-900)", borderRadius: 14, padding: "24px 22px", color: "#fff" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 38, height: 38, borderRadius: 9999, background: "rgba(249,166,6,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Zap size={17} style={{ color: "var(--accent)" }} />
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 15, margin: "0 0 5px" }}>The 2-hour promise</p>
                    <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.62)", margin: 0, lineHeight: 1.6 }}>
                      Every inquiry gets a real human response within 2 business hours. No call centres, no runaround.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT, Form */}
            <div className="card" style={{ padding: "36px 32px" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "var(--olea-ink)", margin: "0 0 5px" }}>
                Request a free assessment
              </h3>
              <p style={{ fontSize: 14, color: "var(--fg-2)", margin: "0 0 26px" }}>
                No obligation. No jargon. Just honest advice.
              </p>

              {status === "success" ? (
                <div style={{ background: "var(--olea-green-50)", border: "1px solid var(--olea-green-100)", borderRadius: 12, padding: "40px 24px", textAlign: "center" }}>
                  <div style={{ fontSize: 40, marginBottom: 14 }}>✅</div>
                  <h3 style={{ fontWeight: 700, fontSize: 20, color: "var(--olea-green-800)", margin: "0 0 8px" }}>Request sent!</h3>
                  <p style={{ fontSize: 15, color: "var(--fg-2)", margin: 0 }}>We&apos;ll reach out within 2 business hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                  {/* Row 1: Full Name + Phone */}
                  <div className="contact-form-row">
                    <div>
                      <label style={label}>Full Name <span style={{ color: "var(--accent)" }}>*</span></label>
                      <input
                        style={field} type="text" required placeholder="Your name"
                        value={form.name}
                        onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                        onFocus={(e) => (e.target.style.borderColor = "var(--olea-green-600)")}
                        onBlur={(e)  => (e.target.style.borderColor = "var(--border-subtle)")}
                      />
                    </div>
                    <div>
                      <label style={label}>Phone <span style={{ color: "var(--accent)" }}>*</span></label>
                      <input
                        style={field} type="tel" required placeholder="+234 ..."
                        value={form.phone}
                        onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))}
                        onFocus={(e) => (e.target.style.borderColor = "var(--olea-green-600)")}
                        onBlur={(e)  => (e.target.style.borderColor = "var(--border-subtle)")}
                      />
                    </div>
                  </div>

                  {/* Row 2: Email */}
                  <div>
                    <label style={label}>Email</label>
                    <input
                      style={field} type="email" placeholder="you@email.com"
                      value={form.email}
                      onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                      onFocus={(e) => (e.target.style.borderColor = "var(--olea-green-600)")}
                      onBlur={(e)  => (e.target.style.borderColor = "var(--border-subtle)")}
                    />
                  </div>

                  {/* Row 3: Interest */}
                  <div>
                    <label style={label}>I&apos;m interested in</label>
                    <select
                      style={{ ...field, cursor: "pointer", appearance: "auto" }}
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

                  {/* Row 4: Message */}
                  <div>
                    <label style={label}>Tell us about your needs</label>
                    <textarea
                      style={{ ...field, minHeight: 100, resize: "vertical" }}
                      placeholder="e.g. 3-bedroom home, want to cover essentials + 2 ACs through the night..."
                      value={form.message}
                      onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                      onFocus={(e) => (e.target.style.borderColor = "var(--olea-green-600)")}
                      onBlur={(e)  => (e.target.style.borderColor = "var(--border-subtle)")}
                    />
                  </div>

                  {status === "error" && (
                    <p style={{ color: "var(--olea-danger)", fontSize: 13.5, margin: 0 }}>
                      Something went wrong. Please try again.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    style={{
                      width: "100%",
                      background: "var(--accent)",
                      color: "var(--olea-green-900)",
                      border: "none",
                      borderRadius: 9999,
                      padding: "15px 24px",
                      fontSize: 15,
                      fontWeight: 700,
                      fontFamily: "var(--font-sans)",
                      cursor: status === "loading" ? "default" : "pointer",
                      opacity: status === "loading" ? 0.75 : 1,
                      transition: "opacity 200ms",
                      marginTop: 4,
                    }}
                  >
                    {status === "loading" ? "Sending…" : "Send Request →"}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 56px;
          align-items: start;
        }
        .contact-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        @media (max-width: 1023px) {
          .contact-grid { gap: 40px; }
        }
        @media (max-width: 767px) {
          .contact-grid     { grid-template-columns: 1fr; gap: 36px; }
          .contact-form-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
