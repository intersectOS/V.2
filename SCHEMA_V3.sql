-- ══════════════════════════════════════════════
-- INTERSECT PartnerOS — Schema V3 (Full System)
-- ══════════════════════════════════════════════

-- PEOPLE DIRECTORY (Employees + Freelancers + Consultants + Experts)
create table if not exists ix_people (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  person_type text not null, -- 'employee' | 'freelancer' | 'consultant' | 'expert'
  freelancer_type text, -- 'Legal' | 'Financial' | 'Technical' | 'Design' | 'Marketing' | 'Translation' | 'Other'
  role text,
  specializations text, -- comma separated
  nationality text,
  languages text, -- comma separated
  residence text,
  bio text,
  email text,
  phone text,
  whatsapp text,
  cv_url text, -- Google Drive link
  photo_url text, -- Google Drive link
  show_photo boolean default true,
  rate_hourly numeric,
  rate_monthly numeric,
  rate_yearly numeric,
  availability text default 'Available', -- 'Available' | 'Busy' | 'Unavailable'
  access_code text unique,
  show_in_marketplace boolean default false,
  created_at timestamptz default now()
);
alter table ix_people enable row level security;
create policy "public_all" on ix_people for all using (true) with check (true);

-- CLIENTS (Enhanced)
create table if not exists ix_clients_v2 (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  industry text,
  country text,
  website text,
  service_type text, -- 'Soft Landing' | 'BDS' | 'JV' | 'Advisory' | 'Expert Marketplace' | 'Other'
  stage text default 'OPEN', -- project stages
  code text unique not null,
  -- Team
  main_am_id text, -- main account manager (person id)
  main_am_name text,
  referred_by text, -- internal note only
  referral_person_id text,
  -- Settings
  show_team_names boolean default true, -- show names or just count
  notes_internal text, -- founders only
  notes_client text, -- visible to client
  -- Health
  health_score integer default 100,
  last_interaction timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table ix_clients_v2 enable row level security;
create policy "public_all" on ix_clients_v2 for all using (true) with check (true);

-- CLIENT TEAM MEMBERS
create table if not exists ix_client_team (
  id uuid default gen_random_uuid() primary key,
  client_id text not null,
  client_name text,
  person_id text,
  person_name text,
  person_type text, -- employee | consultant | freelancer | expert | external
  external_name text, -- if not in system
  responsibility text,
  show_to_client boolean default false,
  created_at timestamptz default now()
);
alter table ix_client_team enable row level security;
create policy "public_all" on ix_client_team for all using (true) with check (true);

-- WORKFLOW / UPDATES
create table if not exists ix_workflow (
  id uuid default gen_random_uuid() primary key,
  client_id text not null,
  client_name text,
  title text not null,
  description text,
  stage text,
  status text default 'In Progress', -- 'In Progress' | 'Completed' | 'Blocked'
  show_to_client boolean default true,
  created_by text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table ix_workflow enable row level security;
create policy "public_all" on ix_workflow for all using (true) with check (true);

-- REQUESTS (AM → Team/Consultant/Expert)
create table if not exists ix_requests (
  id uuid default gen_random_uuid() primary key,
  client_id text,
  client_name text,
  title text not null,
  description text,
  file_url text, -- Google Drive
  requested_by text, -- AM name
  assignee_id text,
  assignee_name text,
  assignee_type text, -- employee | consultant | freelancer | expert | external
  external_assignee text,
  status text default 'Pending', -- 'Pending' | 'Accepted' | 'In Progress' | 'Completed' | 'Rejected'
  estimated_days integer,
  accepted_at timestamptz,
  completed_at timestamptz,
  show_to_client boolean default false,
  priority text default 'medium',
  notes text,
  created_at timestamptz default now()
);
alter table ix_requests enable row level security;
create policy "public_all" on ix_requests for all using (true) with check (true);

-- NOTIFICATIONS
create table if not exists ix_notifications (
  id uuid default gen_random_uuid() primary key,
  to_person text,
  to_email text,
  to_whatsapp text,
  type text, -- 'request_received' | 'request_accepted' | 'request_completed' | 'workflow_update'
  title text,
  body text,
  related_id text,
  related_type text,
  is_read boolean default false,
  created_at timestamptz default now()
);
alter table ix_notifications enable row level security;
create policy "public_all" on ix_notifications for all using (true) with check (true);

-- REPORTS
create table if not exists ix_reports (
  id uuid default gen_random_uuid() primary key,
  client_id text not null,
  client_name text,
  period_start date,
  period_end date,
  title text,
  am_notes text,
  show_am_notes boolean default true,
  language text default 'en',
  generated_by text,
  created_at timestamptz default now()
);
alter table ix_reports enable row level security;
create policy "public_all" on ix_reports for all using (true) with check (true);

-- CLIENT FILES (shared docs between Intersect & Client)
create table if not exists ix_client_files (
  id uuid default gen_random_uuid() primary key,
  client_id text not null,
  client_name text,
  name text not null,
  file_type text default 'document', -- NDA | Contract | MoU | Proposal | Report | Other
  url text not null,
  show_to_client boolean default true,
  show_to_am boolean default true,
  uploaded_by text,
  notes text,
  created_at timestamptz default now()
);
alter table ix_client_files enable row level security;
create policy "public_all" on ix_client_files for all using (true) with check (true);

-- EXPERT MARKETPLACE REQUESTS (from client portal)
create table if not exists ix_expert_requests (
  id uuid default gen_random_uuid() primary key,
  client_id text,
  client_name text,
  expert_id text,
  expert_name text,
  expert_specialization text,
  message text,
  status text default 'Pending', -- 'Pending' | 'Responded' | 'Accepted' | 'Rejected'
  our_rate text, -- our price (not expert's rate)
  response_notes text,
  created_at timestamptz default now()
);
alter table ix_expert_requests enable row level security;
create policy "public_all" on ix_expert_requests for all using (true) with check (true);

