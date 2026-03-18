create table public.reviews (
  id         uuid primary key default gen_random_uuid(),
  bank_id    uuid references public.banks on delete cascade,
  author     text not null,
  rating     integer check (rating between 1 and 5),
  body       text not null,
  created_at timestamptz default now()
);

alter table public.reviews enable row level security;
create policy "public read" on public.reviews for select using (true);
create policy "insert anon" on public.reviews for insert with check (true);
