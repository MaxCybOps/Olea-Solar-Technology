"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ShieldCheck, Lock, ChevronRight, CheckCircle } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

const NIGERIAN_STATES = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
  "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","Gombe","Imo","Jigawa",
  "Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger",
  "Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara",
  "FCT - Abuja",
];

const schema = z.object({
  firstName: z.string().min(2, "Enter your first name"),
  lastName: z.string().min(2, "Enter your last name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Enter a valid phone number").max(15),
  street: z.string().min(5, "Enter your street address"),
  city: z.string().min(2, "Enter your city"),
  state: z.string().min(2, "Select your state"),
  notes: z.string().max(500).optional(),
});

type FormData = z.infer<typeof schema>;

const DELIVERY_FEE = 15000;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const subtotal = getTotal();
  const total = subtotal + DELIVERY_FEE;

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  if (items.length === 0) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 120 }}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontWeight: 700, fontSize: 24, marginBottom: 12 }}>Your cart is empty</h2>
          <Link href="/products" className="btn btn-primary">Shop Products →</Link>
        </div>
      </div>
    );
  }

  async function onSubmit(data: FormData) {
    setIsSubmitting(true);
    setError("");

    try {
      // 1. Create order in DB
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: `${data.firstName} ${data.lastName}`,
          customerEmail: data.email,
          customerPhone: data.phone,
          deliveryAddress: { street: data.street, city: data.city, state: data.state },
          items: items.map((i) => ({
            productId: i.productId,
            productName: i.name,
            productPrice: i.price,
            quantity: i.quantity,
          })),
          notes: data.notes,
        }),
      });

      const order = await orderRes.json();
      if (!orderRes.ok) throw new Error(order.error ?? "Failed to create order");

      // 2. Launch Paystack inline payment
      const PaystackPop = (window as any).PaystackPop;
      if (!PaystackPop) throw new Error("Payment system unavailable. Please refresh and try again.");

      const handler = PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
        email: data.email,
        amount: Number(order.total) * 100, // kobo
        ref: `OT-${order.orderNumber}-${Date.now()}`,
        currency: "NGN",
        metadata: { orderId: order.orderId, customerName: `${data.firstName} ${data.lastName}` },
        callback: async (response: { reference: string }) => {
          // 3. Verify payment server-side
          const verifyRes = await fetch(`/api/payments/verify?reference=${response.reference}&orderId=${order.orderId}`);
          const verified = await verifyRes.json();
          if (verified.success) {
            clearCart();
            router.push(`/checkout/success?order=${verified.orderNumber}`);
          } else {
            setError("Payment could not be verified. Please contact us if you were charged.");
          }
        },
        onClose: () => {
          setIsSubmitting(false);
        },
      });

      handler.openIframe();
    } catch (err: any) {
      setError(err.message ?? "Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    border: "1.5px solid var(--border-subtle)",
    borderRadius: 8,
    fontSize: 14,
    fontFamily: "var(--font-sans)",
    color: "var(--olea-ink)",
    background: "#fff",
    outline: "none",
    transition: "border-color 200ms",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 600,
    color: "var(--olea-ink)",
    marginBottom: 6,
    display: "block",
  };

  const errorStyle: React.CSSProperties = {
    fontSize: 12,
    color: "var(--olea-danger)",
    marginTop: 4,
  };

  return (
    <>
      {/* Paystack SDK */}
      <script src="https://js.paystack.co/v1/inline.js" async />

      {/* Header */}
      <div style={{ background: "var(--bg-dark)", paddingTop: 130, paddingBottom: 40, color: "#fff" }}>
        <div className="container">
          <nav style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "rgba(255,255,255,0.55)", marginBottom: 16, flexWrap: "wrap" }}>
            <Link href="/cart" style={{ color: "rgba(255,255,255,0.55)" }}>Cart</Link>
            <ChevronRight size={14} />
            <span style={{ color: "#fff" }}>Checkout</span>
          </nav>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(28px, 4vw, 48px)", margin: 0, color: "#fff" }}>
            Complete your order
          </h1>
        </div>
      </div>

      <div style={{ background: "var(--bg-page)", padding: "48px 0 96px" }}>
        <div className="container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="checkout-layout" style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 32, alignItems: "start" }}>

              {/* Left: form */}
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

                {/* Contact */}
                <div style={{ background: "#fff", borderRadius: 16, padding: 28, boxShadow: "var(--shadow-sm)" }}>
                  <h2 style={{ fontWeight: 700, fontSize: 18, margin: "0 0 22px", color: "var(--olea-ink)" }}>Contact Information</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <label style={labelStyle}>First Name</label>
                      <input {...register("firstName")} style={inputStyle} placeholder="John" />
                      {errors.firstName && <p style={errorStyle}>{errors.firstName.message}</p>}
                    </div>
                    <div>
                      <label style={labelStyle}>Last Name</label>
                      <input {...register("lastName")} style={inputStyle} placeholder="Doe" />
                      {errors.lastName && <p style={errorStyle}>{errors.lastName.message}</p>}
                    </div>
                    <div>
                      <label style={labelStyle}>Email Address</label>
                      <input {...register("email")} type="email" style={inputStyle} placeholder="john@example.com" />
                      {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
                    </div>
                    <div>
                      <label style={labelStyle}>Phone Number</label>
                      <input {...register("phone")} type="tel" style={inputStyle} placeholder="080xxxxxxxx" />
                      {errors.phone && <p style={errorStyle}>{errors.phone.message}</p>}
                    </div>
                  </div>
                </div>

                {/* Delivery */}
                <div style={{ background: "#fff", borderRadius: 16, padding: 28, boxShadow: "var(--shadow-sm)" }}>
                  <h2 style={{ fontWeight: 700, fontSize: 18, margin: "0 0 22px", color: "var(--olea-ink)" }}>Delivery Address</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div>
                      <label style={labelStyle}>Street Address</label>
                      <input {...register("street")} style={inputStyle} placeholder="14 Adeola Odeku Street, Victoria Island" />
                      {errors.street && <p style={errorStyle}>{errors.street.message}</p>}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <label style={labelStyle}>City / LGA</label>
                        <input {...register("city")} style={inputStyle} placeholder="Lagos Island" />
                        {errors.city && <p style={errorStyle}>{errors.city.message}</p>}
                      </div>
                      <div>
                        <label style={labelStyle}>State</label>
                        <select {...register("state")} style={{ ...inputStyle, cursor: "pointer" }}>
                          <option value="">Select state…</option>
                          {NIGERIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                        {errors.state && <p style={errorStyle}>{errors.state.message}</p>}
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>Order Notes (optional)</label>
                      <textarea
                        {...register("notes")}
                        rows={3}
                        style={{ ...inputStyle, resize: "vertical" }}
                        placeholder="Any special instructions, gate codes, installation notes…"
                      />
                    </div>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div style={{ background: "rgba(229,62,62,0.08)", border: "1px solid rgba(229,62,62,0.3)", borderRadius: 10, padding: "14px 18px", color: "var(--olea-danger)", fontSize: 14 }}>
                    {error}
                  </div>
                )}
              </div>

              {/* Right: summary */}
              <div style={{ position: "sticky", top: 100 }}>
                <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "var(--shadow-sm)", marginBottom: 16 }}>
                  <h3 style={{ fontWeight: 700, fontSize: 17, margin: "0 0 18px", color: "var(--olea-ink)" }}>Order Summary</h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 18, maxHeight: 240, overflowY: "auto" }}>
                    {items.map((item) => (
                      <div key={item.productId} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <div style={{ width: 48, height: 48, borderRadius: 8, background: "var(--olea-green-50)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 20 }}>⚡</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--olea-ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</div>
                          <div style={{ fontSize: 12, color: "var(--fg-2)" }}>Qty: {item.quantity}</div>
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--olea-ink)", fontVariantNumeric: "tabular-nums" }}>
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--fg-2)" }}>
                      <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--fg-2)" }}>
                      <span>Delivery</span><span>{formatPrice(DELIVERY_FEE)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 18, color: "var(--olea-ink)", paddingTop: 10, borderTop: "1px dashed var(--border-subtle)" }}>
                      <span>Total</span>
                      <span style={{ fontVariantNumeric: "tabular-nums" }}>{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: "100%",
                    padding: "16px 24px",
                    borderRadius: 9999,
                    border: "none",
                    background: isSubmitting ? "var(--olea-gray-200)" : "var(--accent)",
                    color: isSubmitting ? "var(--fg-2)" : "var(--olea-ink)",
                    fontWeight: 700,
                    fontSize: 16,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    fontFamily: "var(--font-sans)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    boxShadow: isSubmitting ? "none" : "var(--shadow-gold)",
                    transition: "all 250ms",
                    marginBottom: 12,
                  }}
                >
                  <Lock size={16} />
                  {isSubmitting ? "Processing…" : `Pay ${formatPrice(total)} with Paystack`}
                </button>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 12, color: "var(--fg-2)" }}>
                  <ShieldCheck size={13} style={{ color: "var(--olea-green-600)" }} />
                  256-bit SSL encryption · Cards never stored
                </div>
              </div>

            </div>
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .checkout-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
