create table public.bank_rate_history (
  id          uuid primary key default gen_random_uuid(),
  bank_id     uuid references public.banks on delete cascade,
  savings_rate numeric(5,2),
  recorded_at  timestamptz default now()
);

alter table public.bank_rate_history enable row level security;
create policy "public read" on public.bank_rate_history for select using (true);
