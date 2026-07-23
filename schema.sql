-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table
create table public.users (
  id uuid default uuid_generate_v4() primary key,
  phone text unique not null,
  name text,
  email text,
  pin_hash text not null,
  role text default 'user',
  biometric_enabled boolean default false,
  address text,
  profile_picture_url text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Transactions table
create table public.transactions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id),
  type text not null, -- 'send', 'receive', 'cash_out', 'merchant_pay'
  amount numeric not null,
  recipient_phone text,
  status text default 'completed',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- OTPs table
create table public.otps (
  id uuid default uuid_generate_v4() primary key,
  phone text not null,
  otp text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  expires_at timestamp with time zone default (now() + interval '5 minutes')
);
