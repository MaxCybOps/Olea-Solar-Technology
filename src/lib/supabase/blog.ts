import { supabaseAdmin } from "./admin";
import type { BlogPostRow } from "@/types/database";
import type { BlogPost } from "@/lib/blog-data";

export function mapRowToPost(row: BlogPostRow): BlogPost & { image?: string } {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? "",
    category: row.category ?? "General",
    author: row.author ?? "Olea Team",
    date: new Date(row.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    readTime: row.read_time ?? "5 min",
    featured: row.is_featured,
    body: (row.body as unknown as BlogPost["body"]) ?? [],
    image: row.image_url ?? undefined,
  };
}

export async function fetchAllPublishedPosts(): Promise<(BlogPost & { image?: string })[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from("blog_posts")
      .select("*")
      .eq("is_published", true)
      .order("is_featured", { ascending: false })
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return (data as unknown as BlogPostRow[]).map(mapRowToPost);
  } catch {
    return [];
  }
}

export async function fetchPostBySlug(slug: string): Promise<(BlogPost & { image?: string }) | null> {
  try {
    const { data } = await supabaseAdmin
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();

    if (!data) return null;
    return mapRowToPost(data as unknown as BlogPostRow);
  } catch {
    return null;
  }
}
