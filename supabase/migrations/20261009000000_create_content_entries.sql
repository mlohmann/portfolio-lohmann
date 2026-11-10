create table if not exists public.content_entries (
  id uuid primary key default gen_random_uuid(),
  collection text not null,
  slug text not null,
  content jsonb not null,
  published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (collection, slug)
);

alter table public.content_entries enable row level security;

revoke all on table public.content_entries from anon, authenticated;
grant select on table public.content_entries to anon, authenticated;
grant insert, update, delete on table public.content_entries to authenticated;

drop policy if exists "Public can read published content" on public.content_entries;
create policy "Public can read published content"
  on public.content_entries
  for select
  to anon, authenticated
  using (published = true);

drop policy if exists "Admins can manage content" on public.content_entries;
create policy "Admins can manage content"
  on public.content_entries
  for all
  to authenticated
  using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

comment on table public.content_entries is
  'CMS compatibility table. Store one JSON document per collection/slug while the frontend migrates from bundled JSON.';

comment on column public.content_entries.content is
  'Validated content document matching the corresponding TypeScript frontend shape.';
