create table public.banks (
  id               uuid primary key default gen_random_uuid(),
  slug             text unique not null,
  name             text not null,
  norwegian_label  text not null,
  type             text not null,
  region           text not null,
  country          text not null,
  flag             text default '🇳🇴',
  description      text not null,
  rating           numeric(3,1) default 4.0,
  savings_rate     numeric(5,2) default 0,
  monthly_fee      numeric(8,2) default 0,
  min_balance      numeric(12,2) default 0,
  is_sponsored     boolean default false,
  affiliate_url    text,
  logo_url         text,
  pros             text[] default '{}',
  cons             text[] default '{}',
  established      integer,
  deposit_insured  boolean default true,
  bankid_support   boolean default true,
  vipps_support    boolean default true,
  swift_code       text,
  created_at       timestamptz default now()
);

alter table public.banks enable row level security;
create policy "public read" on public.banks for select using (true);

create index on public.banks(slug);
create index on public.banks(savings_rate desc);
create index on public.banks(monthly_fee asc);
create index on public.banks(is_sponsored desc, rating desc);
