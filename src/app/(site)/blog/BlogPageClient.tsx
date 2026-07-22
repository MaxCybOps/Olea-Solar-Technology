"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import type { BlogPost } from "@/lib/blog-data";

type PostWithImage = BlogPost & { image?: string };

export default function BlogPageClient({ posts }: { posts: PostWithImage[] }) {
  const ALL_CATS = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];
  const [activeCat, setActiveCat] = useState("All");

  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.id !== featured?.id).filter((p) => activeCat === "All" || p.category === activeCat);
  const showFeatured = featured && (activeCat === "All" || featured.category === activeCat);

  return (
    <>
      {/* Category filters */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
        {ALL_CATS.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            style={{
              fontSize: 13.5, fontWeight: 500, padding: "8px 18px", borderRadius: 9999, cursor: "pointer",
              background: activeCat === cat ? "var(--olea-green-800)" : "#fff",
              color: activeCat === cat ? "#fff" : "var(--olea-ink)",
              border: `1.5px solid ${activeCat === cat ? "var(--olea-green-800)" : "var(--border-subtle)"}`,
              transition: "var(--t-base)", fontFamily: "var(--font-sans)",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured article */}
      {showFeatured && featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="blog-featured"
          style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", borderRadius: 16, overflow: "hidden", boxShadow: "var(--shadow-lg)", marginBottom: 52, background: "#fff", textDecoration: "none" }}
        >
          <div style={{ position: "relative", minHeight: 380 }}>
            <Image
              src={featured.image ?? "/images/blog/solar-sizing.jpg"}
              alt={featured.title}
              fill
              style={{ objectFit: "cover" }}
            />
            <span style={{ position: "absolute", top: 18, left: 18, background: "var(--accent)", color: "var(--olea-green-900)", padding: "4px 12px", borderRadius: 4, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {featured.category}
            </span>
          </div>
          <div style={{ padding: "44px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--olea-green-700)", marginBottom: 14 }}>Featured</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(22px, 2.5vw, 30px)", lineHeight: 1.15, letterSpacing: "-0.02em", margin: "0 0 16px", color: "var(--olea-ink)" }}>
              {featured.title}
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--fg-2)", margin: "0 0 24px" }}>{featured.excerpt}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              <span className="btn btn-primary" style={{ pointerEvents: "none" }}>Read Article →</span>
              <span style={{ fontSize: 13, color: "var(--fg-2)", display: "flex", alignItems: "center", gap: 5 }}>
                <Clock size={13} /> {featured.date} · {featured.readTime} read
              </span>
            </div>
          </div>
        </Link>
      )}

      {/* Article grid */}
      {rest.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="blog-grid">
          {rest.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="blog-card"
              style={{ background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column", textDecoration: "none", border: "1px solid var(--border-subtle)", transition: "var(--t-base)" }}
            >
              <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden" }}>
                <Image
                  src={post.image ?? "/images/blog/solar-sizing.jpg"}
                  alt={post.title}
                  fill
                  style={{ objectFit: "cover", transition: "transform 500ms" }}
                  className="blog-card-img"
                />
                <span style={{ position: "absolute", top: 14, left: 14, background: "var(--accent)", color: "var(--olea-green-900)", padding: "3px 10px", borderRadius: 4, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {post.category}
                </span>
              </div>
              <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", flex: 1 }}>
                <h3 style={{ fontWeight: 600, fontSize: 17, lineHeight: 1.35, margin: "0 0 10px", color: "var(--olea-ink)" }}>{post.title}</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.55, color: "var(--fg-2)", margin: "0 0 16px", flex: 1 }}>{post.excerpt.slice(0, 100)}…</p>
                <div style={{ fontSize: 12, color: "var(--fg-2)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>{post.date}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock size={11} /> {post.readTime} read</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--fg-2)" }}>
          <p style={{ fontSize: 16 }}>No articles in this category yet.</p>
          <button onClick={() => setActiveCat("All")} className="btn btn-outline-dark" style={{ marginTop: 16 }}>Show all articles</button>
        </div>
      )}

      <style>{`
        .blog-featured { transition: box-shadow 300ms; }
        .blog-featured:hover { box-shadow: var(--shadow-xl) !important; }
        .blog-card:hover { box-shadow: var(--shadow-md) !important; transform: translateY(-3px); }
        .blog-card:hover .blog-card-img { transform: scale(1.05); }
        @media (max-width: 960px) { .blog-featured { grid-template-columns: 1fr !important; } }
        @media (max-width: 768px) { .blog-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 540px) { .blog-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
