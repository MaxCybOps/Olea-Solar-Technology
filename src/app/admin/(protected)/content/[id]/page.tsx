import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/admin";
import BlogPostForm from "../BlogPostForm";
import type { BlogPostRow } from "@/types/database";

export const dynamic = "force-dynamic";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data, error } = await supabaseAdmin.from("blog_posts").select("*").eq("id", id).single();
  if (error || !data) notFound();
  return <BlogPostForm mode="edit" post={data as BlogPostRow} />;
}
