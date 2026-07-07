-- Create leads table
create table if not exists public.contact_leads (
    id uuid default gen_random_uuid() primary key,
    full_name text not null,
    email text not null,
    phone text,
    company text,
    purpose text not null,
    message text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.contact_leads enable row level security;

-- Create policy to allow public inserts (anyone can submit the contact form)
create policy "Allow public inserts" on public.contact_leads
    for insert with check (true);

-- Create policy to allow authenticated select
create policy "Allow authenticated select" on public.contact_leads
    for select using (auth.role() = 'authenticated');

-- Create policy to allow authenticated delete
create policy "Allow authenticated delete" on public.contact_leads
    for delete using (auth.role() = 'authenticated');

-- Create policy to allow authenticated update
create policy "Allow authenticated update" on public.contact_leads
    for update using (auth.role() = 'authenticated');
