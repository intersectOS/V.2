-- ══════════════════════════════════
-- INTERSECT PartnerOS — Schema V2
-- Run in Supabase SQL Editor
-- ══════════════════════════════════

-- PROJECTS
create table if not exists ix_projects (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  client_name text,
  status text default 'Active',
  priority text default 'medium',
  start_date date,
  end_date date,
  members text default '[]',
  tags text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table ix_projects enable row level security;
create policy "public_all" on ix_projects for all using (true) with check (true);

-- TASKS
create table if not exists ix_tasks (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  project_id uuid references ix_projects(id) on delete cascade,
  project_name text,
  assignee text,
  status text default 'To Do',
  priority text default 'medium',
  deadline date,
  notes text,
  done boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table ix_tasks enable row level security;
create policy "public_all" on ix_tasks for all using (true) with check (true);

-- FILES (links only - stored in Google Drive/OneDrive)
create table if not exists ix_files (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  type text default 'document',
  url text not null,
  entity_type text,
  entity_id text,
  entity_name text,
  notes text,
  created_at timestamptz default now()
);
alter table ix_files enable row level security;
create policy "public_all" on ix_files for all using (true) with check (true);

-- Add transcript to meetings if not exists
alter table ix_meetings add column if not exists transcript text default '';

-- Add columns to existing tables
alter table ix_actions add column if not exists project_name text;
