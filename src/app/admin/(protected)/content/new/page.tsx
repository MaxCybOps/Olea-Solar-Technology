import BlogPostForm from "../BlogPostForm";

export const metadata = { title: "New Article" };

export default function NewArticlePage() {
  return <BlogPostForm mode="create" />;
}
