"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const FAQS = [
  {
    q: "How much does a solar system cost?",
    a: "It depends entirely on your energy needs. A complete home system typically starts around ₦1.4M fully installed, while industrial systems scale from there. The honest answer comes after a free assessment — we size to your real load, never a guess, and model your exact payback before you commit.",
  },
  {
    q: "How long does installation take?",
    a: "Most residential installations are completed within 1–3 days. Commercial and industrial projects take 3–10 days depending on scale. We give you a firm timeline before we start, and we stick to it.",
  },
  {
    q: "What happens when there's no sun for days?",
    a: "Our systems include battery storage designed to carry you through 1–3 days of low sunlight. For critical loads, we design deeper storage or hybrid backup. You won't be left in the dark.",
  },
  {
    q: "Do you offer financing or payment plans?",
    a: "Yes. We offer structured payment plans for qualifying residential and commercial projects. Speak to our team about your project size — we'll find a payment structure that works for your budget.",
  },
  {
    q: "What warranty do I get?",
    a: "All Olea installations come with a 25-year performance warranty on panels, 10 years on inverters, and a 5-year installation workmanship warranty. We stand behind everything we put up.",
  },
  {
    q: "Do you maintain the system after installation?",
    a: "Yes. We offer scheduled maintenance packages and emergency call-outs. Our smart monitoring platform also lets us detect issues remotely before they affect your power — often before you even notice.",
  },
  {
    q: "Can solar really run air conditioners and heavy appliances?",
    a: "Absolutely. We size systems to handle your actual load — including ACs, freezers, pumps, and industrial equipment. The key is proper sizing. We do a full energy audit before designing your system.",
  },
  {
    q: "Where do you operate?",
    a: "We currently serve Owerri, Lagos, Abuja, Port Harcourt, Enugu, and Kano, with installations across 6 states. We're expanding rapidly — contact us and we'll confirm availability in your area.",
  },
];

export default function FAQsPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ position: "relative", background: "var(--olea-green-900)", color: "#fff", paddingTop: 160, paddingBottom: 88, overflow: "hidden", minHeight: 460 }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src="/images/services/aca.jpg"
            alt=""
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(7,41,31,0.88) 0%, rgba(7,41,31,0.65) 100%)" }} />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <nav style={{ fontSize: 13, color: "rgba(255,255,255,0.50)", marginBottom: 28 }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.50)" }}>Home</Link>
            <span style={{ margin: "0 8px" }}>›</span>
            <span>FAQs</span>
          </nav>
          <span className="eyebrow">Questions &amp; Answers</span>
          <h1 className="t-display" style={{ color: "#fff", margin: "0 0 22px", maxWidth: 740, lineHeight: 1.06 }}>
            Everything you<br />
            <span style={{ color: "var(--accent)" }}>wanted to ask.</span>
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.70)", maxWidth: 640, lineHeight: 1.7, margin: 0 }}>
            Straight answers about cost, installation, warranties, and what it&apos;s really like to go solar with Olea.
          </p>
        </div>
      </section>

      {/* ── ACCORDION ── */}
      <section className="section section-bg">
        <div className="container-narrow">

          <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
            {FAQS.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={i} style={{ borderBottom: i < FAQS.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 16,
                      padding: "22px 28px",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span style={{
                      fontWeight: 600,
                      fontSize: 15.5,
                      color: isOpen ? "var(--olea-green-800)" : "var(--olea-ink)",
                      lineHeight: 1.4,
                      transition: "color 180ms",
                    }}>
                      {item.q}
                    </span>

                    {/* + / - circle icon */}
                    <span style={{
                      flexShrink: 0,
                      width: 30, height: 30,
                      borderRadius: 9999,
                      background: isOpen ? "var(--accent)" : "var(--olea-green-50)",
                      border: isOpen ? "none" : "1.5px solid var(--olea-green-100)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "background 180ms, border 180ms",
                      fontSize: 18,
                      fontWeight: 400,
                      color: isOpen ? "var(--olea-green-900)" : "var(--olea-green-700)",
                      lineHeight: 1,
                    }}>
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {/* Animated answer */}
                  <div style={{
                    display: "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition: "grid-template-rows 300ms cubic-bezier(0.22,1,0.36,1)",
                  }}>
                    <div style={{ overflow: "hidden" }}>
                      <p style={{
                        padding: "0 28px 22px",
                        fontSize: 14.5,
                        lineHeight: 1.75,
                        color: "var(--fg-2)",
                        margin: 0,
                      }}>
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── BOTTOM CTA ── */}
          <div style={{
            background: "var(--olea-green-900)",
            borderRadius: 18,
            padding: "48px 40px",
            textAlign: "center",
            color: "#fff",
            marginTop: 48,
          }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(20px, 2.6vw, 30px)", margin: "0 0 10px", color: "#fff" }}>
              Still have a question?
            </h3>
            <p style={{ color: "rgba(255,255,255,0.62)", margin: "0 0 28px", fontSize: 15, lineHeight: 1.6 }}>
              Our team is one message away — and we actually reply.
            </p>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "var(--accent)",
                color: "var(--olea-green-900)",
                borderRadius: 9999,
                padding: "13px 28px",
                fontSize: 14.5,
                fontWeight: 700,
                fontFamily: "var(--font-sans)",
                textDecoration: "none",
              }}
            >
              Talk to an Expert →
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
