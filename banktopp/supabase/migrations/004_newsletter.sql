create table public.newsletter_subscribers (
  id         uuid primary key default gen_random_uuid(),
  email      text unique not null,
  created_at timestamptz default now()
);

alter table public.newsletter_subscribers enable row level security;
create policy "insert anon" on public.newsletter_subscribers for insert with check (true);
