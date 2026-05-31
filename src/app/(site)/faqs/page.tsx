"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/constants";

export default function FAQsPage() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <>
      {/* Hero */}
      <section style={{ background: "var(--bg-dark)", color: "#fff", paddingTop: 160, paddingBottom: 80, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: "-5%", top: "10%", width: 400, height: 400, background: "radial-gradient(circle, rgba(249,166,6,0.12) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative" }}>
          <span className="eyebrow">Frequently Asked Questions</span>
          <h1 className="t-display" style={{ color: "#fff", margin: "0 0 20px", maxWidth: 640 }}>
            Everything you need to know about{" "}
            <span style={{ color: "var(--accent)" }}>clean energy.</span>
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.72)", maxWidth: 540, lineHeight: 1.6 }}>
            We've answered your most common questions. Still not sure? Talk to our team.
          </p>
          <nav style={{ marginTop: 16, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.5)" }}>Home</Link>
            <span style={{ margin: "0 8px" }}>›</span>
            <span>FAQs</span>
          </nav>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="section section-bg">
        <div className="container-narrow">
          {FAQS.map((section) => (
            <div key={section.category} style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--olea-green-800)", margin: "0 0 20px", paddingBottom: 12, borderBottom: "2px solid var(--olea-green-100)" }}>
                {section.category}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {section.items.map((item) => {
                  const key = `${section.category}-${item.q}`;
                  const isOpen = open === key;
                  return (
                    <div
                      key={key}
                      className="card"
                      style={{ overflow: "hidden", border: isOpen ? "1px solid var(--olea-green-100)" : "1px solid transparent" }}
                    >
                      <button
                        onClick={() => setOpen(isOpen ? null : key)}
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: 16,
                          padding: "20px 24px",
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          textAlign: "left",
                        }}
                        aria-expanded={isOpen}
                      >
                        <span style={{ fontWeight: 600, fontSize: 16, color: "var(--olea-ink)", lineHeight: 1.4 }}>{item.q}</span>
                        <ChevronDown
                          size={20}
                          style={{ flexShrink: 0, color: "var(--olea-green-600)", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 300ms" }}
                        />
                      </button>
                      <div style={{ height: isOpen ? "auto" : 0, overflow: "hidden", transition: "height 300ms ease" }}>
                        <div style={{ padding: "0 24px 24px", fontSize: 15, lineHeight: 1.7, color: "var(--fg-2)" }}>
                          {item.a}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Still have questions */}
          <div style={{ background: "var(--bg-dark)", borderRadius: 16, padding: "48px", textAlign: "center", color: "#fff", marginTop: 48 }}>
            <h3 style={{ fontWeight: 700, fontSize: 24, margin: "0 0 12px" }}>Still have questions?</h3>
            <p style={{ color: "rgba(255,255,255,0.72)", margin: "0 0 28px", fontSize: 16, lineHeight: 1.6 }}>
              Our AI assistant is live right now — or reach us directly.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn btn-primary">Send a Message →</Link>
              <a href="tel:+2348000000000" className="btn btn-outline-light">Call Us</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
