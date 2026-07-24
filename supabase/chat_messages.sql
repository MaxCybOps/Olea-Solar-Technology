-- Run this once in Supabase → SQL Editor → New Query → paste → Run.
-- Stores AI chat widget transcripts so the admin "Olea AI Agent" page can
-- show real conversations instead of nothing. session_id is a random id
-- the browser generates and keeps in localStorage per visitor.

create table if not exists public.chat_messages (
  id               uuid primary key default gen_random_uuid(),
  session_id       text not null,
  role             text not null, -- 'user' | 'assistant'
  content          text not null,
  created_at       timestamptz not null default now()
);

create index if not exists chat_messages_session_idx on public.chat_messages (session_id, created_at);

alter table public.chat_messages enable row level security;

-- No public read policy: the chat API route writes via the service role
-- key (server-side), and only the admin panel (also service role) reads.
