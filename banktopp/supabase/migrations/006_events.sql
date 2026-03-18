create table public.click_events (
  id         uuid primary key default gen_random_uuid(),
  slug       text not null,
  referrer   text,
  user_agent text,
  created_at timestamptz default now()
);

create table public.advertise_inquiries (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  company    text not null,
  email      text not null,
  tier       text not null,
  message    text,
  created_at timestamptz default now()
);

alter table public.click_events enable row level security;
alter table public.advertise_inquiries enable row level security;
create policy "insert anon" on public.click_events for insert with check (true);
create policy "insert anon" on public.advertise_inquiries for insert with check (true);
