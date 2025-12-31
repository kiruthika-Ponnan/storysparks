# Implementation Plan

This roadmap breaks the StorySparks build into actionable increments. Each phase can
be shipped independently while layering core functionality toward the full AI-powered
ad creation experience.

## Phase 0 – Foundations
- Configure npm workspaces, shared TypeScript config, linting, and formatting.
- Scaffold Prisma schema + Postgres migrations for `User`, `Project`, `Asset`,
  `GenerationTask`.
- Implement NextAuth with email magic links (fallback to Google OAuth when keys exist).
- Build dashboard shell: project list, creation CTA, empty states.
- Expose basic CRUD server actions for projects and assets (no uploads yet).

## Phase 1 – Asset Intake & Mock Generation
- Integrate UploadThing/S3 for image & video uploads with signed URL support.
- Complete 3-step project wizard with validation and progress tracking.
- Add mock generation pipeline that simulates AI steps and populates demo data.
- Create dashboard cards showing status, generated script, storyboard previews.
- Implement notifications/polling for generation status updates.

## Phase 2 – Real AI Integration
- Connect OpenAI (script, storyboard copy) via adapters with retry/logging.
- Add TTS provider integration (ElevenLabs or OpenAI TTS) with storage handling.
- Queue FFmpeg worker job to stitch assets, audio, captions into video outputs.
- Surface downloadable assets and shareable preview player in dashboard.
- Add campaign tips generator and CTA copy suggestions per project.

## Phase 3 – Collaboration & Polishing
- Introduce team roles, project sharing, and audit logs.
- Layer in guided editing (script tweaks, re-render requests).
- Improve UX with shadcn/ui components, responsiveness, and accessibility checks.
- Localize key flows (en-US baseline with i18n support).
- Add analytics hooks (PostHog) and error monitoring (Sentry).

## Phase 4 – Production Hardening
- Set up CI (GitHub Actions) for lint, test, type-check, migrations.
- Add integration tests (Playwright) for wizard and dashboard flows.
- Harden API with rate limiting, input sanitization, and logging.
- Configure infrastructure IaC (Terraform) for database, queue, storage.
- Prepare deployment pipelines: Vercel web, Render/Cloud Run workers, migrations.

## Phase 5 – Launch Readiness
- Populate marketing site content and CTAs linking into auth flow.
- Finalize pricing plans, billing (Stripe) scaffolding, and paywall gating.
- Run load tests on queue + worker pipeline; tune scaling thresholds.
- Complete legal/security checklist (terms, privacy, SOC2 prep).
- Collect beta feedback and iterate toward GA release.

