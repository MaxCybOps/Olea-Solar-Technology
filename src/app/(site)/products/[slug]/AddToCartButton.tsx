"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCartStore } from "@/store/cart";
import type { Product } from "@/types";

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    if (product.stockQuantity === 0) return;
    addItem({ productId: product.id, name: product.name, price: product.price, quantity: qty, slug: product.slug });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const outOfStock = product.stockQuantity === 0;

  return (
    <div>
      {/* Qty + Add row */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
        <div style={{ display: "inline-flex", alignItems: "center", border: "1.5px solid var(--border-subtle)", borderRadius: 9999, background: "#fff" }}>
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={outOfStock}
            style={{ width: 42, height: 42, border: "none", background: "transparent", cursor: "pointer", fontSize: 20, color: "var(--olea-ink)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "9999px 0 0 9999px" }}
          >−</button>
          <span style={{ padding: "0 18px", fontWeight: 700, fontSize: 16, fontVariantNumeric: "tabular-nums", minWidth: 28, textAlign: "center" }}>{qty}</span>
          <button
            onClick={() => setQty((q) => Math.min(product.stockQuantity, q + 1))}
            disabled={outOfStock}
            style={{ width: 42, height: 42, border: "none", background: "transparent", cursor: "pointer", fontSize: 20, color: "var(--olea-ink)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "0 9999px 9999px 0" }}
          >+</button>
        </div>

        <button
          onClick={handleAdd}
          disabled={outOfStock}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "13px 24px",
            borderRadius: 9999,
            border: "none",
            background: outOfStock ? "var(--olea-gray-200)" : added ? "var(--olea-green-600)" : "var(--accent)",
            color: outOfStock ? "var(--fg-2)" : "var(--olea-ink)",
            fontWeight: 700,
            fontSize: 15,
            cursor: outOfStock ? "not-allowed" : "pointer",
            transition: "all 300ms cubic-bezier(0.22,1,0.36,1)",
            fontFamily: "var(--font-sans)",
            boxShadow: outOfStock ? "none" : "var(--shadow-gold)",
          }}
        >
          {added ? <Check size={18} /> : <ShoppingCart size={18} />}
          {outOfStock ? "Out of Stock" : added ? "Added to Cart!" : `Add ${qty > 1 ? qty + " × " : ""}to Cart`}
        </button>
      </div>

      {/* Notify if out of stock */}
      {outOfStock && (
        <p style={{ fontSize: 13, color: "var(--fg-2)", margin: "0 0 14px" }}>
          This product is currently out of stock.{" "}
          <a href="/contact" style={{ color: "var(--accent-hover)", fontWeight: 600 }}>Contact us</a> to be notified when it's back.
        </p>
      )}
    </div>
  );
}
