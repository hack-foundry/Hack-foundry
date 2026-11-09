-- Run in the Supabase SQL editor. Tables are written only by the server
-- (service-role key), so Row Level Security is enabled with no public policies.

create table if not exists public.waitlist (
  id          bigint generated always as identity primary key,
  email       text not null unique,
  first_name  text,
  interest    text not null default 'programs',
  locale      text,
  country     char(2),
  consent_at  timestamptz not null,
  created_at  timestamptz not null default now()
);

create table if not exists public.orders (
  id                  bigint generated always as identity primary key,
  stripe_session_id   text not null unique,
  stripe_customer_id  text,
  email               text,
  item_id             text,
  country             char(2),
  tier                char(1),
  mode                text,
  amount_total        integer,
  currency            text,
  created_at          timestamptz not null default now()
);

create table if not exists public.subscription_events (
  id                      bigint generated always as identity primary key,
  stripe_subscription_id  text not null,
  stripe_customer_id      text,
  status                  text,
  event_type              text,
  created_at              timestamptz not null default now()
);

alter table public.waitlist enable row level security;
alter table public.orders enable row level security;
alter table public.subscription_events enable row level security;
