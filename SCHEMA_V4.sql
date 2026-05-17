
-- INVOICES
create table if not exists ix_invoices (
  id uuid default gen_random_uuid() primary key,
  invoice_number text unique not null,
  client_id text,
  client_name text,
  expert_id text,
  expert_name text,
  service_type text, -- 'hourly' | 'monthly' | 'yearly'
  service_description text,
  hours_or_units numeric default 1,
  rate_price numeric not null,
  subtotal numeric,
  vat_rate numeric default 15,
  vat_amount numeric,
  total numeric,
  currency text default 'SAR',
  status text default 'Draft', -- 'Draft' | 'Sent' | 'Paid' | 'Cancelled'
  issue_date date default current_date,
  due_date date,
  notes text,
  -- Intersect company info
  company_name text default 'Intersect Venture Builder',
  company_address text,
  company_vat text,
  company_email text,
  company_phone text,
  -- Delivery
  sent_via text, -- 'system' | 'email' | 'manual'
  sent_at timestamptz,
  created_at timestamptz default now()
);
alter table ix_invoices enable row level security;
create policy "public_all" on ix_invoices for all using (true) with check (true);

-- EXPERT BOOKING REQUESTS (enhanced)
alter table ix_expert_requests add column if not exists service_type text;
alter table ix_expert_requests add column if not exists requested_date date;
alter table ix_expert_requests add column if not exists requested_time text;
alter table ix_expert_requests add column if not exists duration_hours numeric;
alter table ix_expert_requests add column if not exists invoice_id text;
alter table ix_expert_requests add column if not exists expert_confirmed boolean default false;
