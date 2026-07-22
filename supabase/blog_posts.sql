-- Run this once in Supabase → SQL Editor → New Query → paste → Run.
-- Creates the blog_posts table so the admin Content/CMS page can manage
-- real articles instead of the static list in src/lib/blog-data.ts.

create table if not exists public.blog_posts (
  id               uuid primary key default gen_random_uuid(),
  title            text not null,
  slug             text not null unique,
  excerpt          text,
  body             jsonb not null default '[]'::jsonb,
  category         text,
  author           text,
  image_url        text,
  read_time        text,
  is_featured      boolean not null default false,
  is_published     boolean not null default false,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists blog_posts_published_idx on public.blog_posts (is_published, created_at desc);

alter table public.blog_posts enable row level security;

-- Public (anon key) can read only published posts
create policy "Public can read published posts"
  on public.blog_posts for select
  using (is_published = true);

-- The service role key (used only server-side in the admin panel) bypasses
-- RLS automatically, so no insert/update/delete policy is needed for admin writes.
