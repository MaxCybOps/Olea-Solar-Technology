"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, ShoppingBag, Package, Users,
  Sparkles, FileText, Settings, LogOut, Star,
} from "lucide-react";

const NAV_SECTIONS = [
  {
    label: "Operations",
    items: [
      { id: "dashboard", label: "Dashboard", href: "/admin",          icon: LayoutDashboard },
      { id: "orders",    label: "Orders",    href: "/admin/orders",   icon: ShoppingBag },
      { id: "products",  label: "Products",  href: "/admin/products", icon: Package },
      { id: "customers", label: "Customers", href: "/admin/customers",icon: Users },
    ],
  },
  {
    label: "Engagement",
    items: [
      { id: "reviews",  label: "Reviews",      href: "/admin/reviews",  icon: Star },
      { id: "leads",    label: "Leads",        href: "/admin/leads",    icon: Sparkles },
      { id: "content",  label: "Blog / CMS",   href: "/admin/content",  icon: FileText },
    ],
  },
  {
    label: "System",
    items: [
      { id: "settings", label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <aside style={{ width: 220, background: "var(--olea-green-900)", color: "#fff", display: "flex", flexDirection: "column", height: "100vh", flexShrink: 0, borderRight: "1px solid rgba(255,255,255,0.06)" }}>
      {/* Brand */}
      <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center" }}>
        <Image src="/images/logo-white.png" alt="Olea" width={130} height={34} style={{ height: 34, width: "auto" }} />
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: "auto", padding: 10 }}>
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", padding: "18px 10px 6px" }}>
              {section.label}
            </div>
            {section.items.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 10px",
                    borderRadius: 8,
                    fontSize: 13.5,
                    fontWeight: active ? 600 : 400,
                    color: active ? "#fff" : "rgba(255,255,255,0.7)",
                    background: active ? "rgba(249,166,6,0.14)" : "transparent",
                    marginBottom: 2,
                    position: "relative",
                    transition: "background 150ms, color 150ms",
                    textDecoration: "none",
                  }}
                >
                  {active && (
                    <span style={{ position: "absolute", left: -10, top: 8, bottom: 8, width: 3, background: "var(--accent)", borderRadius: "0 3px 3px 0" }} />
                  )}
                  <Icon size={16} style={{ opacity: active ? 1 : 0.8, flexShrink: 0 }} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User */}
      <div style={{ padding: "14px 16px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 9999, background: "var(--olea-green-700)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "var(--accent)", flexShrink: 0 }}>
          OA
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Admin</div>
          <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.5)" }}>Olea Technologies</div>
        </div>
        <Link href="/" title="Back to site" style={{ color: "rgba(255,255,255,0.5)", display: "flex" }}>
          <LogOut size={15} />
        </Link>
      </div>
    </aside>
  );
}
