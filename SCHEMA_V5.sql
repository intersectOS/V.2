-- Add client-facing price columns to ix_people (separate from internal cost)
alter table ix_people add column if not exists rate_hourly_price text;
alter table ix_people add column if not exists rate_monthly_price text;
alter table ix_people add column if not exists rate_yearly_price text;

-- Add service_type, time fields to expert_requests
alter table ix_expert_requests add column if not exists service_type text;
alter table ix_expert_requests add column if not exists requested_date date;
alter table ix_expert_requests add column if not exists requested_time text;
alter table ix_expert_requests add column if not exists expert_confirmed boolean default false;

-- Invoice table (run if not exists)
create table if not exists ix_invoices (
  id uuid default gen_random_uuid() primary key,
  invoice_number text unique not null,
  client_name text, expert_name text,
  service_type text, service_description text,
  hours_or_units numeric default 1, rate_price numeric,
  subtotal numeric, vat_rate numeric default 15,
  vat_amount numeric, total numeric,
  currency text default 'SAR', status text default 'Draft',
  issue_date date, due_date date, notes text,
  company_name text, company_address text,
  company_vat text, company_email text,
  sent_via text, created_at timestamptz default now()
);
alter table ix_invoices enable row level security;
create policy if not exists "public_all" on ix_invoices for all using (true) with check (true);
