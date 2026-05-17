-- Run in Supabase SQL Editor
create table if not exists ix_actions (
  id uuid default gen_random_uuid() primary key,
  title text not null, assignee text, client_name text,
  deadline date, priority text default 'medium',
  notes text, done boolean default false,
  created_at timestamptz default now()
);
alter table ix_actions enable row level security;
create policy "public_all" on ix_actions for all using (true) with check (true);
alter table ix_clients add column if not exists account_managers text default '[]';
alter table ix_clients add column if not exists consultants text default '[]';

-- Add transcript column to meetings (private, founders only)
alter table ix_meetings add column if not exists transcript text default '';
