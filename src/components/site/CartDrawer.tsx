"use client";

import Link from "next/link";
import { X, ShoppingBag, Trash2, Zap } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const { items, drawerOpen, closeDrawer, updateQuantity, removeItem, getTotal } = useCartStore();
  const total = getTotal();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        style={{
          position: "fixed", inset: 0, zIndex: 150,
          background: "rgba(7,41,31,0.55)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          opacity: drawerOpen ? 1 : 0,
          pointerEvents: drawerOpen ? "auto" : "none",
          transition: "opacity 300ms ease",
        }}
      />

      {/* Drawer panel */}
      <div
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0,
          width: "min(420px, 92vw)",
          zIndex: 160,
          background: "#fff",
          boxShadow: "-8px 0 40px rgba(0,0,0,0.18)",
          display: "flex", flexDirection: "column",
          transform: drawerOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 320ms cubic-bezier(0.22,1,0.36,1)",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid var(--border-subtle)", flexShrink: 0 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--olea-ink)", margin: 0 }}>
            Your cart {items.length > 0 && <span style={{ fontSize: 14, fontWeight: 400, color: "var(--fg-2)", fontFamily: "var(--font-sans)" }}>({items.length})</span>}
          </h2>
          <button
            onClick={closeDrawer}
            aria-label="Close cart"
            style={{ width: 36, height: 36, borderRadius: 9999, border: "1px solid var(--border-subtle)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--olea-ink)" }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {items.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "60px 24px", textAlign: "center" }}>
              <div style={{ width: 72, height: 72, borderRadius: 9999, background: "var(--olea-green-50)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <ShoppingBag size={32} style={{ color: "var(--olea-green-600)" }} />
              </div>
              <p style={{ fontWeight: 600, fontSize: 17, color: "var(--olea-ink)", margin: "0 0 8px" }}>Your cart is empty.</p>
              <p style={{ fontSize: 14, color: "var(--fg-2)", margin: "0 0 28px", lineHeight: 1.55 }}>Add products to get started.</p>
              <button
                onClick={closeDrawer}
                style={{ background: "var(--olea-green-800)", color: "#fff", border: "none", borderRadius: 9999, padding: "12px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-sans)" }}
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div style={{ padding: "8px 0" }}>
              {items.map((item) => (
                  <div key={item.productId} style={{ display: "flex", gap: 14, padding: "16px 24px", borderBottom: "1px solid var(--border-subtle)" }}>
                    <div style={{ width: 60, height: 60, borderRadius: 10, background: "linear-gradient(135deg, var(--olea-green-700), var(--olea-green-900))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Zap size={22} style={{ color: "rgba(249,166,6,0.85)" }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: 600, fontSize: 14, color: "var(--olea-ink)", margin: "0 0 4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</p>
                      <p style={{ fontSize: 13, color: "var(--fg-2)", margin: "0 0 10px" }}>{formatPrice(item.price)}</p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", border: "1.5px solid var(--border-subtle)", borderRadius: 9999, overflow: "hidden" }}>
                          <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} style={{ width: 30, height: 30, border: "none", background: "transparent", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--olea-ink)" }}>−</button>
                          <span style={{ padding: "0 10px", fontWeight: 700, fontSize: 13, fontVariantNumeric: "tabular-nums" }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} style={{ width: 30, height: 30, border: "none", background: "transparent", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--olea-ink)" }}>+</button>
                        </div>
                        <button onClick={() => removeItem(item.productId)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--olea-danger)", display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontFamily: "var(--font-sans)" }}>
                          <Trash2 size={13} /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: "20px 24px", borderTop: "1px solid var(--border-subtle)", flexShrink: 0, background: "#fff" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18, fontSize: 17, fontWeight: 700, color: "var(--olea-ink)" }}>
              <span>Subtotal</span>
              <span style={{ fontVariantNumeric: "tabular-nums" }}>{formatPrice(total)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeDrawer}
              className="btn btn-primary"
              style={{ display: "flex", justifyContent: "center", width: "100%", fontSize: 15, padding: "14px 20px", marginBottom: 10 }}
            >
              Checkout →
            </Link>
            <Link
              href="/cart"
              onClick={closeDrawer}
              style={{ display: "block", textAlign: "center", fontSize: 13, color: "var(--fg-2)", textDecoration: "underline" }}
            >
              View full cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
