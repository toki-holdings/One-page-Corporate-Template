-- 会社ラク経営: app_state_snapshots security hardening
-- Purpose: each authenticated Supabase user can only read/write their own app snapshot.

alter table public.app_state_snapshots enable row level security;

-- Remove older broad policies if they exist.
drop policy if exists "app_state_select_own" on public.app_state_snapshots;
drop policy if exists "app_state_insert_own" on public.app_state_snapshots;
drop policy if exists "app_state_update_own" on public.app_state_snapshots;
drop policy if exists "app_state_delete_own" on public.app_state_snapshots;
drop policy if exists "Enable read access for all users" on public.app_state_snapshots;
drop policy if exists "Enable insert for authenticated users only" on public.app_state_snapshots;
drop policy if exists "Enable update for users based on user_id" on public.app_state_snapshots;

create policy "app_state_select_own"
on public.app_state_snapshots
for select
to authenticated
using (user_id::text = auth.uid()::text);

create policy "app_state_insert_own"
on public.app_state_snapshots
for insert
to authenticated
with check (user_id::text = auth.uid()::text);

create policy "app_state_update_own"
on public.app_state_snapshots
for update
to authenticated
using (user_id::text = auth.uid()::text)
with check (user_id::text = auth.uid()::text);

create policy "app_state_delete_own"
on public.app_state_snapshots
for delete
to authenticated
using (user_id::text = auth.uid()::text);

-- Keep public anonymous users out explicitly. RLS already denies by default, this documents intent.
