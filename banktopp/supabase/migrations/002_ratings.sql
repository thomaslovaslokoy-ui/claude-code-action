create table public.bank_ratings (
  id        uuid primary key default gen_random_uuid(),
  bank_id   uuid references public.banks on delete cascade,
  dimension text not null,
  score     numeric(3,1) not null
);

alter table public.bank_ratings enable row level security;
create policy "public read" on public.bank_ratings for select using (true);
