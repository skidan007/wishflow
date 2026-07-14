# WishFlow

Phase 1 foundation for WishFlow: organization authentication, a multi-tenant Supabase schema, route protection, and the dashboard experience.

## Local setup

1. Copy `.env.example` to `.env.local` and add your Supabase project URL and anon key.
2. In Supabase SQL Editor, run `supabase/migrations/20260714000000_wishflow_foundation.sql`.
3. In Supabase Authentication settings, add `http://localhost:3000/auth/callback` as a redirect URL.
4. Run `npm install`, then `npm run dev`.

The signup trigger provisions one organization and owner profile per new Supabase user. Every tenant-owned table is protected through Row Level Security.

## Phase 1 routes

- `/` — marketing entry
- `/signup`, `/login`, `/forgot-password`, `/reset-password` — authentication flows
- `/dashboard` — protected dashboard

Next phases can add employee CRUD, imports, poster workflows, reminders, and email scheduling on this organization model.
