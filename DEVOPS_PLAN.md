# DevOps & Deployment Plan

## Environment Configuration
- `.env.local` for local secrets; `.env.example` tracked with placeholder values.
- Use Doppler/1Password for shared secret management.
- Configure separate environments: `development`, `staging`, `production`.

### Key Variables
- `DATABASE_URL`
- `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
- OAuth credentials (Google)
- AI provider keys (OpenAI, ElevenLabs)
- `STORAGE_BUCKET`, `STORAGE_REGION`
- `REDIS_URL` for BullMQ queue

## Tooling & Automation
- **Package management:** npm workspaces with root scripts proxying to app-specific tasks.
- **Formatting:** Prettier + Biome (optional) integrated with lint-staged & Husky pre-commit.
- **Linting:** ESLint (Next.js) and vue-tsc/eslint-plugin-vue for marketing site.
- **Testing:** Vitest for unit tests, Playwright for e2e, Prisma test database seeding.
- **CI:** GitHub Actions pipeline running `lint`, `typecheck`, `test`, and Prisma migration check.

## Infrastructure Targets
- **Database:** Neon or Supabase Postgres with connection pooling.
- **Queue:** Upstash Redis (serverless) or managed Redis on Render.
- **Storage:** Supabase Storage or AWS S3 with signed URL workflow.
- **Workers:** Dockerized Node services deployed to Cloud Run/Render with FFmpeg layer.
- **Observability:** Sentry for error tracking, Grafana + Loki stack or Axiom for logs.

## Deployment Workflow
1. Merge to `main` triggers CI → deployment previews on Vercel (Next.js) and staging container builds.
2. Promotion to production via tagged releases; apply database migrations using Prisma `migrate deploy`.
3. Workers pull latest image; queue drains to ensure zero-downtime.
4. Marketing site deployed as static bundle to Vercel/Netlify or served via API Express adapter.

## Disaster Recovery & Security
- Automated daily Postgres backups; snapshot storage assets weekly.
- Maintain least-privilege IAM roles for storage/queue access.
- Implement rate limiting on API service and auth endpoints.
- Track dependency updates with Renovate bot; run `npm audit` in CI.
- Health checks + uptime alerts using BetterStack or PagerDuty integrations.

