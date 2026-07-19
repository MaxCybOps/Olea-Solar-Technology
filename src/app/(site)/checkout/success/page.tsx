"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Package, Phone, ArrowRight } from "lucide-react";
import { Suspense } from "react";

function SuccessContent() {
  const params = useSearchParams();
  const orderNumber = params.get("order") ?? "N/A";

  return (
    <div style={{ minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 100, paddingBottom: 80, background: "var(--bg-page)" }}>
      <div style={{ maxWidth: 560, width: "100%", textAlign: "center", padding: "0 24px" }}>
        {/* Icon */}
        <div style={{ width: 96, height: 96, borderRadius: 9999, background: "rgba(56,161,105,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px" }}>
          <CheckCircle size={52} style={{ color: "var(--olea-success)" }} />
        </div>

        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 1.05, margin: "0 0 14px", color: "var(--olea-ink)" }}>
          Order confirmed!
        </h1>
        <p style={{ fontSize: 17, color: "var(--fg-2)", lineHeight: 1.6, margin: "0 0 10px" }}>
          Thank you for your order. We've received your payment and our team will be in touch shortly.
        </p>
        <div style={{ display: "inline-block", background: "var(--olea-green-50)", color: "var(--olea-green-800)", padding: "8px 20px", borderRadius: 8, fontSize: 14, fontWeight: 700, marginBottom: 40 }}>
          Order #{orderNumber}
        </div>

        {/* What's next */}
        <div style={{ background: "#fff", borderRadius: 16, padding: 28, boxShadow: "var(--shadow-sm)", marginBottom: 32, textAlign: "left" }}>
          <h3 style={{ fontWeight: 700, fontSize: 17, margin: "0 0 18px", color: "var(--olea-ink)" }}>What happens next</h3>
          {[
            { icon: Package, step: "Order confirmed", detail: "You'll receive an email confirmation with your order details." },
            { icon: Phone, step: "Our team calls you", detail: "An Olea engineer will contact you within 24 hours to confirm delivery or installation details." },
            { icon: ArrowRight, step: "Delivery & installation", detail: "Your equipment will be delivered and optionally installed by our certified team." },
          ].map(({ icon: I, step, detail }, idx) => (
            <div key={step} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: idx < 2 ? 18 : 0 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9999, background: "var(--olea-green-50)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <I size={18} style={{ color: "var(--olea-green-600)" }} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: "var(--olea-ink)", marginBottom: 2 }}>{step}</div>
                <div style={{ fontSize: 13, color: "var(--fg-2)", lineHeight: 1.5 }}>{detail}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/products" className="btn btn-primary">Continue Shopping →</Link>
          <Link href="/contact" className="btn btn-outline-dark">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading…</div>}>
      <SuccessContent />
    </Suspense>
  );
}
