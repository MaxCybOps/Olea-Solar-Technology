import type { Metadata } from "next";
import Link from "next/link";
import { Plus, FileText, Edit2 } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { BLOG_POSTS } from "@/lib/blog-data";
import type { BlogPostRow } from "@/types/database";

export const metadata: Metadata = { title: "Blog / CMS" };
export const dynamic = "force-dynamic";

async function fetchPosts(): Promise<BlogPostRow[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    return data as unknown as BlogPostRow[];
  } catch {
    return [];
  }
}

export default async function ContentPage() {
  const posts = await fetchPosts();
  const usingFallback = posts.length === 0;

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "32px 36px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, color: "var(--olea-ink)", margin: 0 }}>Blog / CMS</h1>
          <p style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 4 }}>
            {usingFallback ? `${BLOG_POSTS.length} static articles, showing on the live site` : `${posts.length} articles`}
          </p>
        </div>
        <Link href="/admin/content/new" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--olea-green-900)", color: "#fff", padding: "11px 20px", borderRadius: 10, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
          <Plus size={16} /> New Article
        </Link>
      </div>

      {usingFallback && (
        <div style={{ background: "rgba(249,166,6,0.10)", border: "1px solid rgba(249,166,6,0.3)", borderRadius: 10, padding: "14px 18px", marginBottom: 24, fontSize: 13, color: "#8a5e00", lineHeight: 1.6 }}>
          <FileText size={14} style={{ verticalAlign: -2, marginRight: 6 }} />
          No articles in the database yet, so the site is showing the {BLOG_POSTS.length} built-in demo articles instead. The moment you publish your first article here, the demo articles disappear from the live blog and only your database articles show, the same rule as the products catalog.
        </div>
      )}

      <div style={{ background: "#fff", borderRadius: 14, boxShadow: "var(--shadow-sm)", border: "1px solid var(--border-subtle)", overflow: "hidden" }}>
        {usingFallback ? (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "var(--olea-green-50)", borderBottom: "1px solid var(--border-subtle)" }}>
                {["Title (demo, read-only)", "Category", "Author", "Read Time"].map((h) => (
                  <th key={h} style={{ padding: "13px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-2)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BLOG_POSTS.map((p, i) => (
                <tr key={p.id} style={{ borderBottom: i < BLOG_POSTS.length - 1 ? "1px solid var(--border-subtle)" : "none", opacity: 0.7 }}>
                  <td style={{ padding: "14px 16px", fontWeight: 600 }}>{p.title}</td>
                  <td style={{ padding: "14px 16px", color: "var(--fg-2)" }}>{p.category}</td>
                  <td style={{ padding: "14px 16px", color: "var(--fg-2)" }}>{p.author}</td>
                  <td style={{ padding: "14px 16px", color: "var(--fg-2)" }}>{p.readTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "var(--olea-green-50)", borderBottom: "1px solid var(--border-subtle)" }}>
                {["Title", "Category", "Status", "Date", "Actions"].map((h) => (
                  <th key={h} style={{ padding: "13px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-2)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {posts.map((p, i) => (
                <tr key={p.id} style={{ borderBottom: i < posts.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
                  <td style={{ padding: "14px 16px", fontWeight: 600 }}>
                    {p.title}
                    {p.is_featured && <span style={{ marginLeft: 8, fontSize: 10, fontWeight: 700, color: "#8a5e00", background: "rgba(249,166,6,0.15)", padding: "2px 8px", borderRadius: 4 }}>FEATURED</span>}
                  </td>
                  <td style={{ padding: "14px 16px", color: "var(--fg-2)" }}>{p.category}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 4, background: p.is_published ? "rgba(56,161,105,0.12)" : "rgba(229,62,62,0.08)", color: p.is_published ? "#1d6b3f" : "#b53030" }}>
                      {p.is_published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px", color: "var(--fg-2)" }}>
                    {new Date(p.created_at).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <Link href={`/admin/content/${p.id}`} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: "var(--olea-green-700)", background: "var(--olea-green-50)", padding: "6px 12px", borderRadius: 6, textDecoration: "none" }}>
                      <Edit2 size={13} /> Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
