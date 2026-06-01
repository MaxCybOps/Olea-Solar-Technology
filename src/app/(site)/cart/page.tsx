"use client";

import Link from "next/link";
import { Trash2, ShoppingBag, Zap, Sun, BatteryCharging, Home, SlidersVertical, Wrench, ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  inverters: Zap,
  solar_panels: Sun,
  batteries: BatteryCharging,
  systems: Home,
  charge_controllers: SlidersVertical,
  accessories: Wrench,
};

const DELIVERY_FEE = 15000;

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, getTotal } = useCartStore();
  const subtotal = getTotal();
  const delivery = subtotal > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + delivery;

  if (items.length === 0) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 120 }}>
        <div style={{ textAlign: "center", maxWidth: 400 }}>
          <div style={{ width: 96, height: 96, borderRadius: 9999, background: "var(--olea-green-50)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <ShoppingBag size={42} style={{ color: "var(--olea-green-600)" }} />
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 32, margin: "0 0 12px", color: "var(--olea-ink)" }}>
            Your cart is empty
          </h1>
          <p style={{ fontSize: 16, color: "var(--fg-2)", marginBottom: 32, lineHeight: 1.6 }}>
            You haven't added anything yet. Browse our products and find the right energy solution for you.
          </p>
          <Link href="/products" className="btn btn-primary">
            Shop Products →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div style={{ background: "var(--bg-dark)", paddingTop: 130, paddingBottom: 48, color: "#fff" }}>
        <div className="container">
          <span className="eyebrow">Shopping Cart</span>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1.05, margin: "0 0 8px", color: "#fff" }}>
            Your Cart
          </h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)" }}>
            {items.length} item{items.length !== 1 ? "s" : ""} in your cart
          </p>
        </div>
      </div>

      {/* Body */}
      <div style={{ background: "var(--bg-page)", padding: "48px 0 96px" }}>
        <div className="container">
          <div className="cart-layout" style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 32, alignItems: "start" }}>

            {/* Items */}
            <div>
              <div style={{ background: "#fff", borderRadius: 16, boxShadow: "var(--shadow-sm)", overflow: "hidden" }}>
                {/* Table header */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: 16, padding: "16px 24px", borderBottom: "1px solid var(--border-subtle)", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--fg-2)" }}>
                  <span>Product</span>
                  <span style={{ textAlign: "center", minWidth: 110 }}>Quantity</span>
                  <span style={{ textAlign: "right", minWidth: 100 }}>Price</span>
                  <span style={{ textAlign: "right", minWidth: 80 }}>Total</span>
                </div>

                {items.map((item) => {
                  const IconComp = CATEGORY_ICONS["inverters"]; // default fallback icon
                  return (
                    <div key={item.productId} style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: 16, padding: "20px 24px", borderBottom: "1px solid var(--border-subtle)", alignItems: "center" }} className="cart-row">
                      {/* Product info */}
                      <div style={{ display: "flex", gap: 14, alignItems: "center", minWidth: 0 }}>
                        <div style={{ width: 72, height: 72, borderRadius: 10, background: "linear-gradient(135deg, var(--olea-green-700), var(--olea-green-900))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Zap size={28} style={{ color: "rgba(249,166,6,0.8)" }} />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <Link href={`/products/${item.slug}`} style={{ fontWeight: 600, fontSize: 15, color: "var(--olea-ink)", display: "block", marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {item.name}
                          </Link>
                          <button
                            onClick={() => removeItem(item.productId)}
                            style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--olea-danger)", fontSize: 12, fontFamily: "var(--font-sans)", padding: 0, display: "flex", alignItems: "center", gap: 4 }}
                          >
                            <Trash2 size={12} /> Remove
                          </button>
                        </div>
                      </div>

                      {/* Qty */}
                      <div style={{ display: "flex", alignItems: "center", border: "1.5px solid var(--border-subtle)", borderRadius: 9999, minWidth: 110, justifyContent: "center" }}>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          style={{ width: 34, height: 34, border: "none", background: "transparent", cursor: "pointer", fontSize: 16, color: "var(--olea-ink)", display: "flex", alignItems: "center", justifyContent: "center" }}
                        >−</button>
                        <span style={{ padding: "0 12px", fontWeight: 700, fontSize: 14, fontVariantNumeric: "tabular-nums" }}>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          style={{ width: 34, height: 34, border: "none", background: "transparent", cursor: "pointer", fontSize: 16, color: "var(--olea-ink)", display: "flex", alignItems: "center", justifyContent: "center" }}
                        >+</button>
                      </div>

                      {/* Unit price */}
                      <div style={{ textAlign: "right", fontSize: 14, color: "var(--fg-2)", minWidth: 100 }}>
                        {formatPrice(item.price)}
                      </div>

                      {/* Line total */}
                      <div style={{ textAlign: "right", fontWeight: 700, fontSize: 15, color: "var(--olea-ink)", minWidth: 80, fontVariantNumeric: "tabular-nums" }}>
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  );
                })}

                {/* Footer actions */}
                <div style={{ padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                  <Link href="/products" style={{ fontSize: 14, color: "var(--fg-2)", display: "flex", alignItems: "center", gap: 6 }}>
                    ← Continue Shopping
                  </Link>
                  <button
                    onClick={clearCart}
                    style={{ background: "transparent", border: "1px solid var(--olea-danger)", color: "var(--olea-danger)", padding: "8px 16px", borderRadius: 9999, fontSize: 13, cursor: "pointer", fontFamily: "var(--font-sans)", display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <Trash2 size={13} /> Clear cart
                  </button>
                </div>
              </div>

              {/* Trust strip */}
              <div style={{ display: "flex", gap: 24, marginTop: 24, flexWrap: "wrap" }}>
                {[
                  { icon: ShieldCheck, text: "Secure checkout with Paystack" },
                  { icon: Truck, text: "Nationwide delivery available" },
                  { icon: Zap, text: "Professional installation on request" },
                ].map(({ icon: I, text }) => (
                  <div key={text} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--fg-2)" }}>
                    <I size={15} style={{ color: "var(--olea-green-600)" }} /> {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Order summary */}
            <div style={{ position: "sticky", top: 100 }}>
              <div style={{ background: "#fff", borderRadius: 16, padding: 28, boxShadow: "var(--shadow-sm)" }}>
                <h2 style={{ fontWeight: 700, fontSize: 20, margin: "0 0 22px", color: "var(--olea-ink)" }}>
                  Order Summary
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "var(--fg-2)" }}>
                    <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "var(--fg-2)" }}>
                    <span>Delivery fee</span>
                    <span>{formatPrice(delivery)}</span>
                  </div>
                </div>

                <div style={{ borderTop: "1px dashed var(--border-subtle)", paddingTop: 18, display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 20, color: "var(--olea-ink)", marginBottom: 22 }}>
                  <span>Total</span>
                  <span style={{ fontVariantNumeric: "tabular-nums" }}>{formatPrice(total)}</span>
                </div>

                <Link
                  href="/checkout"
                  className="btn btn-primary"
                  style={{ width: "100%", justifyContent: "center", fontSize: 16, padding: "15px 24px" }}
                >
                  Proceed to Checkout <ArrowRight size={17} />
                </Link>

                <p style={{ fontSize: 12, color: "var(--fg-2)", textAlign: "center", marginTop: 14, lineHeight: 1.5 }}>
                  Secure payment powered by{" "}
                  <span style={{ fontWeight: 600, color: "var(--olea-ink)" }}>Paystack</span>.
                  Your card details are never stored.
                </p>
              </div>

              {/* Need help */}
              <div style={{ background: "var(--olea-green-50)", borderRadius: 12, padding: 20, marginTop: 16 }}>
                <p style={{ fontSize: 13.5, color: "var(--olea-green-800)", margin: "0 0 12px", lineHeight: 1.5 }}>
                  <strong>Not sure what you need?</strong> Our experts can help you build the right system for your budget.
                </p>
                <Link href="/contact" style={{ fontSize: 13, fontWeight: 600, color: "var(--olea-green-700)" }}>
                  Talk to an expert →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .cart-layout { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .cart-row { grid-template-columns: 1fr 1fr !important; gap: 12px !important; }
          .cart-row > :nth-child(3) { display: none; }
        }
      `}</style>
    </>
  );
}
