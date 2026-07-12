import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ChevronRight, Share2 } from "lucide-react";
import Image from "next/image";

const POST_IMAGES: Record<string, string> = {
  b1:  "/images/blog/solar-sizing.jpg",
  b2:  "/images/blog/factory-install.jpg",
  b3:  "/images/blog/battery-guide.jpg",
  b4:  "/images/gallery-3.jpg",
  b5:  "/images/gallery-5.jpg",
  b6:  "/images/gallery-1.jpg",
  b7:  "/images/about/team-work.jpg",
  b8:  "/images/about/team-smiling.jpg",
  b9:  "/images/gallery-2.jpg",
  b10: "/images/gallery-7.jpg",
};
import { BLOG_POSTS, getBlogPostBySlug, getRelatedPosts } from "@/lib/blog-data";

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} — Olea Journal`,
    description: post.excerpt,
  };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.id, 3);

  return (
    <>
      {/* Hero */}
      <section style={{ position: "relative", background: "var(--olea-green-900)", color: "#fff", paddingTop: 148, paddingBottom: 64, overflow: "hidden", minHeight: 440 }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src={POST_IMAGES[post.id] ?? "/images/blog-hero.jpg"}
            alt=""
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(7,41,31,0.92) 0%, rgba(7,41,31,0.75) 100%)" }} />
        </div>
        <div className="container-narrow" style={{ position: "relative", zIndex: 1 }}>
          {/* Breadcrumb */}
          <nav style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 20, flexWrap: "wrap" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.5)" }}>Home</Link>
            <ChevronRight size={13} />
            <Link href="/blog" style={{ color: "rgba(255,255,255,0.5)" }}>Blog</Link>
            <ChevronRight size={13} />
            <span style={{ color: "rgba(255,255,255,0.7)" }}>{post.category}</span>
          </nav>

          <span style={{ display: "inline-block", background: "var(--accent)", color: "var(--olea-ink)", padding: "4px 14px", borderRadius: 4, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 18 }}>
            {post.category}
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 1.0, letterSpacing: "-0.03em", margin: "0 0 20px", color: "#fff" }}>
            {post.title}
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.72)", lineHeight: 1.6, margin: "0 0 28px", maxWidth: 640 }}>
            {post.excerpt}
          </p>

          {/* Meta */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <div style={{ width: 44, height: 44, borderRadius: 9999, background: "linear-gradient(135deg, var(--olea-green-600), var(--olea-green-900))", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, color: "var(--accent)" }}>
              OL
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, color: "#fff" }}>{post.author}</div>
              <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.55)", display: "flex", alignItems: "center", gap: 6 }}>
                <Clock size={12} /> {post.date} · {post.readTime} read
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section style={{ background: "#fff", padding: "64px 0 80px" }}>
        <div className="container-narrow">
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            {post.body.map((block, i) => {
              if (block.type === "h") {
                return (
                  <h2 key={i} style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(20px, 2.5vw, 26px)", lineHeight: 1.25, letterSpacing: "-0.01em", margin: "44px 0 16px", color: "var(--olea-ink)" }}>
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "quote") {
                return (
                  <blockquote key={i} style={{ borderLeft: "3px solid var(--accent)", padding: "6px 0 6px 28px", margin: "36px 0", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(18px, 2.2vw, 24px)", lineHeight: 1.35, color: "var(--olea-green-800)", letterSpacing: "-0.01em" }}>
                    {block.text}
                  </blockquote>
                );
              }
              return (
                <p key={i} style={{ fontSize: 17, lineHeight: 1.75, color: "var(--olea-ink)", margin: "0 0 26px" }}>
                  {block.text}
                </p>
              );
            })}

            {/* In-article CTA */}
            <div style={{ marginTop: 52, padding: 28, background: "var(--olea-green-50)", borderRadius: 14, display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 240 }}>
                <div style={{ fontWeight: 700, fontSize: 19, marginBottom: 6, color: "var(--olea-ink)" }}>Want this sized for your home?</div>
                <div style={{ fontSize: 14.5, color: "var(--fg-2)" }}>Get a free assessment — we'll model your exact system and payback period.</div>
              </div>
              <Link href="/contact" className="btn btn-primary" style={{ flexShrink: 0 }}>
                Get a Free Assessment →
              </Link>
            </div>

            {/* Share row */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 48, paddingTop: 32, borderTop: "1px solid var(--border-subtle)", flexWrap: "wrap" }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--fg-2)", display: "flex", alignItems: "center", gap: 6 }}>
                <Share2 size={15} /> Share this article
              </span>
              {["Twitter / X", "LinkedIn", "WhatsApp"].map((platform) => (
                <span key={platform} style={{ padding: "7px 16px", borderRadius: 9999, border: "1.5px solid var(--border-subtle)", fontSize: 13, color: "var(--fg-2)", cursor: "pointer" }}>
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related articles */}
      {related.length > 0 && (
        <section style={{ background: "var(--bg-page)", padding: "64px 0 80px" }}>
          <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28, margin: 0, color: "var(--olea-ink)" }}>Keep reading</h2>
              <Link href="/blog" style={{ color: "var(--accent-hover)", fontWeight: 600, fontSize: 14 }}>All articles →</Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="related-blog-grid">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="blog-card"
                  style={{ background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column", textDecoration: "none", border: "1px solid var(--border-subtle)", transition: "var(--t-base)" }}
                >
                  <div style={{ aspectRatio: "16/10", position: "relative", overflow: "hidden" }}>
                    <Image
                      src={POST_IMAGES[p.id] ?? "/images/blog-hero.jpg"}
                      alt={p.title}
                      fill
                      style={{ objectFit: "cover", transition: "transform 500ms" }}
                      className="blog-card-img"
                    />
                    <div style={{ position: "absolute", inset: 0, background: "rgba(7,41,31,0.20)" }} />
                    <span style={{ position: "absolute", top: 12, left: 12, background: "var(--accent)", color: "var(--olea-ink)", padding: "3px 9px", borderRadius: 4, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>{p.category}</span>
                  </div>
                  <div style={{ padding: "18px 20px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <h3 style={{ fontWeight: 600, fontSize: 16, lineHeight: 1.35, margin: "0 0 12px", color: "var(--olea-ink)" }}>{p.title}</h3>
                    <div style={{ fontSize: 12, color: "var(--fg-2)", marginTop: "auto", display: "flex", justifyContent: "space-between" }}>
                      <span>{p.date}</span>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock size={11} /> {p.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        .blog-card:hover { box-shadow: var(--shadow-md) !important; transform: translateY(-3px); }
        @media (max-width: 768px) { .related-blog-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 540px) { .related-blog-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
