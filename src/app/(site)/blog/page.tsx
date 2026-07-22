import Link from "next/link";
import Image from "next/image";
import { getStaticPostsWithImages } from "@/lib/blog-data";
import { fetchAllPublishedPosts } from "@/lib/supabase/blog";
import BlogPageClient from "./BlogPageClient";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const dbPosts = await fetchAllPublishedPosts();
  const posts = dbPosts.length > 0 ? dbPosts : getStaticPostsWithImages();

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ position: "relative", background: "var(--olea-green-900)", color: "#fff", paddingTop: 148, paddingBottom: 80, overflow: "hidden", minHeight: 440 }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src="/images/blog-hero.jpg"
            alt=""
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(7,41,31,0.90) 0%, rgba(7,41,31,0.65) 100%)" }} />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <nav style={{ fontSize: 13, color: "rgba(255,255,255,0.48)", marginBottom: 28 }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.48)" }}>Home</Link>
            <span style={{ margin: "0 8px" }}>›</span>
            <span>Blog</span>
          </nav>
          <span className="eyebrow">The Olea Journal</span>
          <h1 className="t-display" style={{ color: "#fff", margin: "0 0 22px", maxWidth: 760, lineHeight: 1.06 }}>
            Clean energy,{" "}
            <span style={{ color: "var(--accent)" }}>explained.</span>
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.70)", maxWidth: 660, lineHeight: 1.7, margin: 0 }}>
            Practical guides, real installation stories, and the science of powering Africa, written by the engineers who do the work.
          </p>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section style={{ background: "#fff", padding: "56px 0 96px" }}>
        <div className="container">
          <BlogPageClient posts={posts} />
        </div>
      </section>

      {/* ── CTA ── */}
      <div style={{ background: "var(--bg-page)", padding: "72px 0", borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span className="eyebrow">Ready to get started?</span>
          <h2 className="headline-section" style={{ marginInline: "auto" }}>Stop reading. Start powering.</h2>
          <p className="lead" style={{ margin: "0 auto 32px" }}>Get a free energy assessment and find out exactly what you need.</p>
          <Link href="/contact" className="btn btn-primary" style={{ fontSize: 16, padding: "15px 30px" }}>Get a Free Assessment →</Link>
        </div>
      </div>
    </>
  );
}
