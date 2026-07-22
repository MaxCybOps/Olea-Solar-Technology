"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Upload, Loader2, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { slugify } from "@/lib/utils";
import type { BlogPostRow } from "@/types/database";

interface BodyBlock { type: "p" | "h" | "quote"; text: string }

// Lightweight markdown-ish editor: blank line separates blocks,
// "## " prefix makes a heading, "> " prefix makes a pull-quote.
function bodyToText(body: unknown): string {
  const blocks = (body as BodyBlock[]) ?? [];
  return blocks.map((b) => {
    if (b.type === "h") return `## ${b.text}`;
    if (b.type === "quote") return `> ${b.text}`;
    return b.text;
  }).join("\n\n");
}

function textToBody(text: string): BodyBlock[] {
  return text.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean).map((line) => {
    if (line.startsWith("## ")) return { type: "h" as const, text: line.slice(3).trim() };
    if (line.startsWith("> ")) return { type: "quote" as const, text: line.slice(2).trim() };
    return { type: "p" as const, text: line };
  });
}

const CATEGORIES = ["Energy Education", "Case Studies", "Product Guides", "Company News", "Maintenance Tips"];

interface Props {
  post?: BlogPostRow;
  mode: "create" | "edit";
}

export default function BlogPostForm({ post, mode }: Props) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [title, setTitle]         = useState(post?.title ?? "");
  const [slug, setSlug]           = useState(post?.slug ?? "");
  const [excerpt, setExcerpt]     = useState(post?.excerpt ?? "");
  const [category, setCategory]   = useState(post?.category ?? CATEGORIES[0]);
  const [author, setAuthor]       = useState(post?.author ?? "Olea Engineering Team");
  const [readTime, setReadTime]   = useState(post?.read_time ?? "5 min");
  const [imageUrl, setImageUrl]   = useState(post?.image_url ?? "");
  const [isFeatured, setFeatured] = useState(post?.is_featured ?? false);
  const [isPublished, setPublished] = useState(post?.is_published ?? false);
  const [bodyText, setBodyText]   = useState(bodyToText(post?.body));

  const [saving, setSaving]       = useState(false);
  const [deleting, setDeleting]   = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError]         = useState("");

  async function uploadImage(file: File) {
    setUploading(true);
    const ext  = file.name.split(".").pop();
    const path = `blog/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error: upErr } = await supabase.storage.from("product-media").upload(path, file, { upsert: true });
    if (upErr) { setError("Image upload failed: " + upErr.message); setUploading(false); return; }
    const { data } = supabase.storage.from("product-media").getPublicUrl(path);
    setImageUrl(data.publicUrl);
    setUploading(false);
  }

  async function handleSave() {
    if (!title.trim() || !bodyText.trim()) { setError("Title and article body are required."); return; }
    setSaving(true);
    setError("");

    const payload = {
      title: title.trim(),
      slug: slug.trim() || slugify(title),
      excerpt: excerpt.trim() || null,
      category,
      author: author.trim() || null,
      read_time: readTime.trim() || null,
      image_url: imageUrl.trim() || null,
      is_featured: isFeatured,
      is_published: isPublished,
      body: textToBody(bodyText),
    };

    if (mode === "create") {
      const res = await fetch("/api/admin/blog", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const json = await res.json();
      if (!res.ok) { setError(json.error ?? "Failed to create post"); setSaving(false); return; }
    } else {
      const res = await fetch(`/api/admin/blog/${post!.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const json = await res.json();
      if (!res.ok) { setError(json.error ?? "Failed to update post"); setSaving(false); return; }
    }

    router.push("/admin/content");
    router.refresh();
  }

  async function handleDelete() {
    if (!post) return;
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    setDeleting(true);
    await fetch(`/api/admin/blog/${post.id}`, { method: "DELETE" });
    router.push("/admin/content");
    router.refresh();
  }

  const inputStyle: React.CSSProperties = { width: "100%", padding: "11px 14px", border: "1.5px solid var(--border-subtle)", borderRadius: 10, fontSize: 14, fontFamily: "var(--font-sans)", color: "var(--olea-ink)", outline: "none", background: "#fff", boxSizing: "border-box" };
  const labelStyle: React.CSSProperties = { display: "block", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg-2)", marginBottom: 6 };

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "32px 36px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, color: "var(--olea-ink)", margin: 0 }}>
          {mode === "create" ? "New Article" : `Edit: ${post?.title}`}
        </h1>
        <div style={{ display: "flex", gap: 10 }}>
          {mode === "edit" && (
            <button onClick={handleDelete} disabled={deleting} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 18px", borderRadius: 10, border: "1.5px solid #e53e3e", background: "#fff", color: "#e53e3e", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "var(--font-sans)" }}>
              <Trash2 size={14} /> {deleting ? "Deleting…" : "Delete"}
            </button>
          )}
          <button onClick={handleSave} disabled={saving} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 22px", borderRadius: 10, border: "none", background: saving ? "var(--olea-gray-200)" : "var(--olea-green-900)", color: saving ? "var(--fg-2)" : "#fff", fontWeight: 700, fontSize: 14, cursor: saving ? "not-allowed" : "pointer", fontFamily: "var(--font-sans)" }}>
            {saving && <Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} />}
            {saving ? "Saving…" : mode === "create" ? "Create Article" : "Save Changes"}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ background: "rgba(229,62,62,0.08)", border: "1px solid rgba(229,62,62,0.25)", borderRadius: 8, padding: "12px 16px", marginBottom: 20, fontSize: 13, color: "#c53030" }}>
          {error}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, alignItems: "start" }}>
        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ background: "#fff", borderRadius: 14, padding: 24, boxShadow: "var(--shadow-sm)", border: "1px solid var(--border-subtle)" }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--olea-ink)", margin: "0 0 18px" }}>Article</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={labelStyle}>Title *</label>
                <input style={inputStyle} value={title} onChange={(e) => { setTitle(e.target.value); if (mode === "create") setSlug(slugify(e.target.value)); }} placeholder="What size solar system does your home need?" />
              </div>
              <div>
                <label style={labelStyle}>URL Slug *</label>
                <input style={inputStyle} value={slug} onChange={(e) => setSlug(e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Excerpt</label>
                <textarea style={{ ...inputStyle, height: 70, resize: "vertical" } as React.CSSProperties} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="One or two sentences shown on the blog listing card" />
              </div>
              <div>
                <label style={labelStyle}>Article Body *</label>
                <p style={{ fontSize: 11.5, color: "var(--fg-2)", margin: "0 0 8px" }}>
                  Separate paragraphs with a blank line. Start a line with <code>## </code> for a heading, or <code>&gt; </code> for a pull-quote.
                </p>
                <textarea style={{ ...inputStyle, height: 360, resize: "vertical", fontFamily: "monospace", fontSize: 13, lineHeight: 1.6 } as React.CSSProperties} value={bodyText} onChange={(e) => setBodyText(e.target.value)} placeholder={"## Start with your load, not the inverter size\n\nBefore you buy anything, get a load assessment...\n\n> A good quote to pull out"} />
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ background: "#fff", borderRadius: 14, padding: 24, boxShadow: "var(--shadow-sm)", border: "1px solid var(--border-subtle)" }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--olea-ink)", margin: "0 0 18px" }}>Cover Image</h2>
            {imageUrl ? (
              <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", borderRadius: 10, overflow: "hidden", marginBottom: 12, border: "1px solid var(--border-subtle)" }}>
                <Image src={imageUrl} alt="" fill style={{ objectFit: "cover" }} />
              </div>
            ) : null}
            <button onClick={() => fileRef.current?.click()} disabled={uploading} style={{ width: "100%", padding: "12px", borderRadius: 10, border: "2px dashed var(--border-subtle)", background: "var(--olea-green-50)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer", color: "var(--fg-2)", fontSize: 13, fontWeight: 600 }}>
              {uploading ? <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> : <Upload size={16} />}
              {uploading ? "Uploading…" : imageUrl ? "Replace Image" : "Upload Cover Image"}
            </button>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadImage(f); e.target.value = ""; }} />
          </div>

          <div style={{ background: "#fff", borderRadius: 14, padding: 24, boxShadow: "var(--shadow-sm)", border: "1px solid var(--border-subtle)" }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--olea-ink)", margin: "0 0 18px" }}>Details</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={labelStyle}>Category</label>
                <select style={inputStyle} value={category ?? ""} onChange={(e) => setCategory(e.target.value)}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Author</label>
                <input style={inputStyle} value={author ?? ""} onChange={(e) => setAuthor(e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Read Time</label>
                <input style={inputStyle} value={readTime ?? ""} onChange={(e) => setReadTime(e.target.value)} placeholder="6 min" />
              </div>
            </div>
          </div>

          <div style={{ background: "#fff", borderRadius: 14, padding: 24, boxShadow: "var(--shadow-sm)", border: "1px solid var(--border-subtle)" }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--olea-ink)", margin: "0 0 18px" }}>Visibility</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "Published", sub: "Visible on the public blog", value: isPublished, set: setPublished },
                { label: "Featured", sub: "Shown as the large lead article", value: isFeatured, set: setFeatured },
              ].map(({ label, sub, value, set }) => (
                <div key={label} onClick={() => set((v) => !v)} style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer", userSelect: "none" }}>
                  <div style={{ width: 44, height: 24, borderRadius: 9999, background: value ? "var(--olea-green-700)" : "var(--olea-gray-300)", position: "relative", flexShrink: 0, transition: "background 200ms", marginTop: 2 }}>
                    <div style={{ position: "absolute", top: 3, left: value ? 23 : 3, width: 18, height: 18, borderRadius: 9999, background: "#fff", transition: "left 200ms", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--olea-ink)" }}>{label}</div>
                    <div style={{ fontSize: 11, color: "var(--fg-2)", marginTop: 2 }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
