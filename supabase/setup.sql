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

drop policy if exists "Public can read active items" on public.items;
create policy "Public can read active items"
on public.items
for select
using (active = true);

drop policy if exists "Public can read inventory" on public.inventory;
create policy "Public can read inventory"
on public.inventory
for select
using (true);

drop policy if exists "Public can create orders" on public.orders;
create policy "Public can create orders"
on public.orders
for insert
with check (status = 'novo');

drop policy if exists "Public can create order items" on public.order_items;
create policy "Public can create order items"
on public.order_items
for insert
with check (quantity > 0);

insert into public.items (slug, name, description, category, active, highlight_order)
values
  ('agua-com-gas', 'Agua com gas', 'Agua mineral com gas gelada.', 'Aguas e sucos', true, 1),
  ('agua-sem-gas', 'Agua sem gas', 'Agua mineral sem gas gelada.', 'Aguas e sucos', true, 2),
  ('agua-de-coco', 'Agua de coco', 'Bebida leve e refrescante.', 'Aguas e sucos', true, 3),
  ('suco-laranja', 'Suco laranja', 'Suco de laranja pronto para servir.', 'Aguas e sucos', true, 4),
  ('agua-saborizada-abacaxi-hortela', 'Agua saborizada abacaxi e hortela', 'Agua saborizada com toque tropical e fresco.', 'Aguas e sucos', true, 5),
  ('agua-saborizada-limao-alegria', 'Agua saborizada limao e alegria', 'Agua saborizada citrica para refrescar.', 'Aguas e sucos', true, 6),
  ('agua-saborizada-bergamota-capim-limao', 'Agua saborizada bergamota e capim limao', 'Agua saborizada aromatica e leve.', 'Aguas e sucos', true, 7),
  ('agua-saborizada-pessego', 'Agua saborizada pessego', 'Agua saborizada com notas suaves de pessego.', 'Aguas e sucos', true, 8),
  ('agua-saborizada-frutas-vermelhas', 'Agua saborizada frutas vermelhas', 'Agua saborizada frutada e delicada.', 'Aguas e sucos', true, 9),
  ('chocolate-quente', 'Chocolate quente', 'Bebida cremosa e reconfortante.', 'Cafes', true, 11),
  ('cappuccino', 'Cappuccino', 'Cafe cremoso com espuma suave.', 'Cafes', true, 12),
  ('cafe-au-lait', 'Cafe au lait', 'Cafe com leite em estilo classico.', 'Cafes', true, 13),
  ('mochaccino-canela', 'Mochaccino canela', 'Mochaccino com toque de canela.', 'Cafes', true, 14),
  ('mochaccino-avela', 'Mochaccino avela', 'Mochaccino com sabor de avela.', 'Cafes', true, 15),
  ('expresso', 'Expresso', 'Cafe intenso e encorpado.', 'Cafes', true, 16),
  ('lacreme-ao-leite', 'Lacreme ao leite', 'Chocolate LaCreme ao leite.', 'Chocolates', true, 18),
  ('lacreme-branco', 'Lacreme branco', 'Chocolate LaCreme branco.', 'Chocolates', true, 19),
  ('chocolate-menta', 'Chocolate menta', 'Chocolate com toque refrescante de menta.', 'Chocolates', true, 20),
  ('chocolate-70-cacau', 'Chocolate 70% cacau', 'Chocolate intenso com 70% cacau.', 'Chocolates', true, 21),
  ('bombons', 'Bombons', 'Selecao de bombons para servir.', 'Chocolates', true, 22),
  ('leite-creme', 'Leite-creme', 'Chocolate com recheio de leite-creme.', 'Chocolates', true, 23),
  ('pistache', 'Pistache', 'Chocolate sabor pistache.', 'Chocolates', true, 24),
  ('ao-leite', 'Ao leite', 'Chocolate classico ao leite.', 'Chocolates', true, 25),
  ('balas', 'Balas', 'Balas embaladas para atendimento rapido.', 'Snacks', true, 26),
  ('chas', 'Chas', 'Selecao de chas da clinica.', 'Chas', true, 27),
  ('peppermint-celestial', 'Peppermint - marca Celestial', 'Cha peppermint da marca Celestial.', 'Chas', true, 28),
  ('true-blueberry-celestial', 'True blueberry - marca Celestial', 'Cha true blueberry da marca Celestial.', 'Chas', true, 29),
  ('barra-cereal-avela-chocolate', 'Barra de cereal avela com chocolate', 'Barra de cereal com avela e chocolate.', 'Snacks', true, 31),
  ('barra-cereal-castanha-caju', 'Barra de cereal castanha de caju', 'Barra de cereal com castanha de caju.', 'Snacks', true, 32)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  category = excluded.category,
  active = excluded.active,
  highlight_order = excluded.highlight_order;

insert into public.inventory (item_id, quantity_current, alert_threshold, unavailable_manual)
select
  items.id,
  case
    when items.category = 'Aguas e sucos' then 12
    when items.category = 'Cafes' then 14
    when items.category = 'Chocolates' then 12
    when items.category = 'Chas' then 10
    else 16
  end as quantity_current,
  case
    when items.category = 'Snacks' then 4
    else 3
  end as alert_threshold,
  false as unavailable_manual
from public.items
on conflict (item_id) do update set
  quantity_current = excluded.quantity_current,
  alert_threshold = excluded.alert_threshold,
  unavailable_manual = excluded.unavailable_manual,
  updated_at = timezone('utc', now());
