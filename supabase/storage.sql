-- Public portfolio assets: every file in this bucket is publicly downloadable.
insert into storage.buckets (id, name, public, allowed_mime_types)
values ('portfolio-images', 'portfolio-images', true, array['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
on conflict (id) do nothing;

drop policy if exists portfolio_images_admin on storage.objects;
create policy portfolio_images_admin on storage.objects
for all to authenticated
using (bucket_id = 'portfolio-images' and (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check (bucket_id = 'portfolio-images' and (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
