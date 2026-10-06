-- MAGNÉTICA 2.0 — STARTER SCHEMA
-- Data: 02/10/2026
-- Revisar em ambiente de desenvolvimento antes de produção.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  locale text not null default 'pt-BR',
  timezone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.relationship_context (
  user_id uuid primary key references auth.users(id) on delete cascade,
  situation text,
  breakup_initiator text,
  elapsed_time text,
  contact_pattern text,
  last_interaction text,
  main_difficulty text,
  desired_outcome text,
  safety_flag boolean not null default false,
  rule_version text not null default 'v1',
  selected_phase text,
  explanation text,
  updated_at timestamptz not null default now()
);

create table if not exists public.onboarding_answers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  question_key text not null,
  answer jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, question_key)
);

create table if not exists public.journey_programs (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  version integer not null default 1,
  status text not null default 'draft' check (status in ('draft','review','published','archived')),
  created_at timestamptz not null default now()
);

create table if not exists public.journey_days (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.journey_programs(id) on delete cascade,
  day_number integer not null check (day_number between 1 and 28),
  phase text not null,
  title text not null,
  objective text,
  body_md text,
  exercise_md text,
  action_md text,
  reflection_md text,
  status text not null default 'draft' check (status in ('draft','review','published','archived')),
  unique(program_id, day_number)
);

create table if not exists public.journey_enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  program_id uuid not null references public.journey_programs(id),
  status text not null default 'active' check (status in ('active','completed','paused','archived')),
  started_at timestamptz not null default now(),
  completed_at timestamptz
);

create unique index if not exists journey_one_active_per_user
  on public.journey_enrollments(user_id)
  where status = 'active';

create table if not exists public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  enrollment_id uuid not null references public.journey_enrollments(id) on delete cascade,
  journey_day_id uuid not null references public.journey_days(id),
  completed_at timestamptz not null default now(),
  unique(enrollment_id, journey_day_id)
);

create table if not exists public.daily_checkins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  local_date date not null,
  mind_load text,
  dominant_feeling text,
  contact_state text,
  need_today text,
  created_at timestamptz not null default now(),
  unique(user_id, local_date)
);

create table if not exists public.timeline_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  occurred_at timestamptz not null,
  event_type text not null,
  description text,
  feeling text,
  interpretation text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.message_drafts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category text,
  body text not null,
  status text not null default 'draft' check (status in ('draft','saved','archived')),
  source_template_key text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  local_date date not null,
  prompt_key text,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.library_items (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  item_type text not null check (item_type in ('reading','audio','practice','checklist','template')),
  category text,
  body_md text,
  audio_path text,
  transcript_md text,
  duration_seconds integer,
  status text not null default 'draft' check (status in ('draft','review','published','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.favorites (
  user_id uuid not null references auth.users(id) on delete cascade,
  library_item_id uuid not null references public.library_items(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key(user_id, library_item_id)
);

create table if not exists public.entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  entitlement_key text not null,
  status text not null default 'active' check (status in ('active','expired','revoked')),
  starts_at timestamptz not null default now(),
  ends_at timestamptz,
  source text,
  unique(user_id, entitlement_key)
);

create table if not exists public.ai_conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text,
  history_opt_in boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ai_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.ai_conversations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('user','assistant')),
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.admin_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('owner','editor','support'))
);

create table if not exists public.admin_audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references auth.users(id),
  action text not null,
  target_type text,
  target_id text,
  metadata jsonb,
  created_at timestamptz not null default now()
);

-- RLS
alter table public.profiles enable row level security;
alter table public.relationship_context enable row level security;
alter table public.onboarding_answers enable row level security;
alter table public.journey_enrollments enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.daily_checkins enable row level security;
alter table public.timeline_events enable row level security;
alter table public.message_drafts enable row level security;
alter table public.journal_entries enable row level security;
alter table public.favorites enable row level security;
alter table public.entitlements enable row level security;
alter table public.ai_conversations enable row level security;
alter table public.ai_messages enable row level security;

-- Usuário acessa apenas os próprios dados.
create policy "profiles_own_all" on public.profiles
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "relationship_context_own_all" on public.relationship_context
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "onboarding_own_all" on public.onboarding_answers
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "enrollments_own_all" on public.journey_enrollments
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "progress_own_all" on public.lesson_progress
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "checkins_own_all" on public.daily_checkins
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "timeline_own_all" on public.timeline_events
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "drafts_own_all" on public.message_drafts
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "journal_own_all" on public.journal_entries
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "favorites_own_all" on public.favorites
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "entitlements_own_read" on public.entitlements
for select using (auth.uid() = user_id);

create policy "ai_conversations_own_all" on public.ai_conversations
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "ai_messages_own_all" on public.ai_messages
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Conteúdo publicado pode ser lido por usuários autenticados.
alter table public.journey_programs enable row level security;
alter table public.journey_days enable row level security;
alter table public.library_items enable row level security;

create policy "published_programs_read" on public.journey_programs
for select to authenticated using (status = 'published');

create policy "published_days_read" on public.journey_days
for select to authenticated using (status = 'published');

create policy "published_library_read" on public.library_items
for select to authenticated using (status = 'published');

-- IMPORTANTE:
-- Escritas administrativas, billing e service-role devem ser implementados
-- apenas em contexto servidor. Não liberar admin com metadata editável.
