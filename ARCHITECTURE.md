# StorySparks Architecture

StorySparks is organized as a multi-app workspace designed to separate concerns between
the authenticated creator experience, the public marketing site, and the backend
services that power AI-assisted ad generation.

## Workspace Overview

```
storysparks/
├── apps/
│   ├── web/           # Next.js 15 (React) creator dashboard & API routes
│   ├── marketing/     # Vue 3 marketing microsite for public landing pages
│   └── api/           # Node.js (Express) service for long-running jobs & webhooks
├── packages/
│   └── prisma/        # Shared Prisma schema, migrations, and generated client
├── prisma/            # Migration history (delegated to packages/prisma)
├── scripts/           # Automation (seeding, worker orchestration, etc.)
└── ARCHITECTURE.md
```

## Responsibilities

- **apps/web**  
  Next.js App Router application delivering the authenticated experience: onboarding
  wizard, project dashboard, asset uploads, and generation status. Uses React Server
  Components, Tailwind, shadcn/ui, and server actions backed by Prisma.

- **apps/marketing**  
  Vue 3 + Vite SPA served through a lightweight Express adapter. Hosts the public
  landing page, product explainer, and CTA that links users into the Next.js app.

- **apps/api**  
  Node.js (Express) REST service that handles background generation orchestration,
  webhook callbacks from AI providers, and communication with the job queue. Exposes
  endpoints consumed by Next.js server actions and background workers.

- **packages/prisma**  
  Provides the Prisma schema, generated client, and seeding helpers. Shared across
  the Next.js app, API service, and worker scripts to ensure a single source of truth
  for the data model.

## Data Flow

1. Users authenticate via NextAuth (Next.js). Sessions are persisted in Postgres.
2. Project creation wizard writes `Project`, `Asset`, and `GenerationTask` records via
   Prisma.
3. Triggering generation enqueues a job into Redis/BullMQ via API service.
4. Worker processes execute AI steps (script, storyboard, voiceover, composition),
   updating task status and storing assets in cloud storage.
5. Next.js server actions poll task status and update UI in real time.

## Deployment Targets

- **Next.js app:** Vercel (web + API routes)
- **API service & workers:** Docker containers on Render or Cloud Run
- **Database:** Neon/Supabase Postgres
- **Queue:** Upstash Redis or managed Redis instance
- **Storage:** Supabase buckets or S3-compatible provider

## Next Steps

1. Configure npm workspaces and root tooling.
2. Scaffold Prisma package and shared configuration.
3. Implement Next.js app structure (auth, wizard, dashboard, API routes).
4. Scaffold Vue marketing app and Express adapter.
5. Build Node API service with background job integration.
6. Add CI, tests, and deployment scripts.

