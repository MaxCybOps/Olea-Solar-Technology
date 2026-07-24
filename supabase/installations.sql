-- Run this once in Supabase → SQL Editor → New Query → paste → Run.
-- Powers the admin Installations page — tracks physical on-site solar
-- installation jobs separately from Orders, since not every order needs
-- a scheduled install visit.

create table if not exists public.installations (
  id               uuid primary key default gen_random_uuid(),
  order_id         uuid references public.orders(id) on delete set null,
  customer_name    text not null,
  customer_phone   text,
  address          text not null,
  scheduled_date   date,
  technician_name  text,
  status           text not null default 'scheduled', -- scheduled | in_progress | completed | cancelled
  notes            text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists installations_status_idx on public.installations (status, scheduled_date);

alter table public.installations enable row level security;

-- No public policy: only the service role key (server-side admin routes) reads/writes this table.
