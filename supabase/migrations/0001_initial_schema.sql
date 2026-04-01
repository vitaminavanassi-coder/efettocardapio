create extension if not exists "pgcrypto";

create table if not exists public.items (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  category text not null,
  image_url text,
  active boolean not null default true,
  highlight_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.inventory (
  item_id uuid primary key references public.items(id) on delete cascade,
  quantity_current integer not null default 0 check (quantity_current >= 0),
  alert_threshold integer not null default 0 check (alert_threshold >= 0),
  unavailable_manual boolean not null default false,
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  patient_name text not null,
  status text not null default 'novo' check (status in ('novo', 'entregue')),
  created_at timestamptz not null default timezone('utc', now()),
  delivered_at timestamptz
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  item_id uuid not null references public.items(id) on delete restrict,
  item_name_snapshot text not null,
  quantity integer not null default 1 check (quantity > 0),
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists items_category_idx on public.items(category);
create index if not exists orders_status_created_at_idx on public.orders(status, created_at desc);
create index if not exists order_items_order_id_idx on public.order_items(order_id);

alter table public.items enable row level security;
alter table public.inventory enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

create policy "Public can read active items"
on public.items
for select
using (active = true);

create policy "Public can read inventory"
on public.inventory
for select
using (true);

create policy "Public can create orders"
on public.orders
for insert
with check (status = 'novo');

create policy "Public can create order items"
on public.order_items
for insert
with check (quantity > 0);
