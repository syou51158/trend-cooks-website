-- Create contacts table
create table public.contacts (
    id uuid default gen_random_uuid() primary key,
    type text check (type in ('reservation', 'inquiry')),
    name text,
    email text,
    phone text,
    reservation_date date,
    reservation_time time,
    guests integer,
    message text,
    status text default 'new',
    created_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.contacts enable row level security;

-- Policies
create policy "Allow anon insert" on public.contacts
    for insert to anon
    with check (true);

create policy "Allow authenticated all" on public.contacts
    for all to authenticated
    using (true);
