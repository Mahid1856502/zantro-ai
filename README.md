## Install Packages

```sh
cd backend
yarn

cd ../frontend
pip install -r requirements.txt
```


## Supabase Setup

#### Retrieve JWT Secret Configuration
```sql
show app.settings.jwt_secret;
```

and add it to the `JWT_SECRET=` field in .env.local.example

#### Create a subscriptions table

```sql
create table public.subscriptions (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) not null,
    subscription_id text not null,
    status text not null,
    pricing_tier text not null,  -- Changed from price_id to match your code
    current_period_end timestamp with time zone,
    current_period_start timestamp with time zone,
    cancel_at_period_end boolean default false,  -- Added to match data-fetching
    canceled_at timestamp with time zone,        -- Added to match data-fetching
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);

-- Create index for faster queries
create index idx_subscriptions_user_id on public.subscriptions(user_id);

-- Enable RLS (Row Level Security)
alter table public.subscriptions enable row level security;

-- Create policy to allow users to read only their own subscriptions
create policy "Users can view own subscriptions"
    on subscriptions for select
    using (auth.uid() = user_id);

-- Create policy to allow service role to manage subscriptions
create policy "Service role can manage subscriptions"
    on subscriptions for all
    using (auth.role() = 'service_role');

-- Create function to auto-update the updated_at column
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Create trigger for updated_at
create trigger set_updated_at
    before update on public.subscriptions
    for each row
    execute procedure public.handle_updated_at();
```

add the supabase keys here
`NEXT_PUBLIC_SUPABASE_URL=`
`NEXT_PUBLIC_SUPABASE_ANON_KEY=`
in .env.local.example in the frontend


## Start servers

### Backend 
```sh
cd backend
yarn dev
```

### Frontend
```sh
cd frontend
python3 main.py
```
