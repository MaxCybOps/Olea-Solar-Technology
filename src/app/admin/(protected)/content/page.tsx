import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-data";

export const metadata: Metadata = { title: "Blog / CMS" };

export default function ContentPage() {
  const posts = BLOG_POSTS;

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "32px 36px" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, color: "var(--olea-ink)", margin: 0 }}>Blog / CMS</h1>
        <p style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 4 }}>
          {posts.length} articles, currently managed in code, not yet editable here
        </p>
      </div>

      <div style={{ background: "rgba(249,166,6,0.10)", border: "1px solid rgba(249,166,6,0.3)", borderRadius: 10, padding: "14px 18px", marginBottom: 24, fontSize: 13, color: "#8a5e00" }}>
        <FileText size={14} style={{ verticalAlign: -2, marginRight: 6 }} />
        This is a read-only preview. Blog posts currently live in <code>src/lib/blog-data.ts</code> and require a code change + deploy to update. A database-backed editor can be built when needed.
      </div>

      <div style={{ background: "#fff", borderRadius: 14, boxShadow: "var(--shadow-sm)", border: "1px solid var(--border-subtle)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "var(--olea-green-50)", borderBottom: "1px solid var(--border-subtle)" }}>
              {["Title", "Category", "Author", "Date", "Read Time"].map((h) => (
                <th key={h} style={{ padding: "13px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-2)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {posts.map((p, i) => (
              <tr key={p.id} style={{ borderBottom: i < posts.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
                <td style={{ padding: "14px 16px", fontWeight: 600 }}>{p.title}</td>
                <td style={{ padding: "14px 16px", color: "var(--fg-2)" }}>{p.category}</td>
                <td style={{ padding: "14px 16px", color: "var(--fg-2)" }}>{p.author}</td>
                <td style={{ padding: "14px 16px", color: "var(--fg-2)", whiteSpace: "nowrap" }}>{p.date}</td>
                <td style={{ padding: "14px 16px", color: "var(--fg-2)" }}>{p.readTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
