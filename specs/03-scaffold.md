# Project Scaffold Specification

## 1. Purpose

This scaffold defines the initial repository shape for the Charts Generator MVP. It turns the approved architecture and stack decisions into a production-ready monorepo baseline that is simple enough for an MVP, but structured enough to grow to the planned `web + api + shared storage` runtime.

The scaffold must:

- keep `apps/web` and `apps/api` clearly separated
- keep shared code limited to what the MVP actually needs
- make local development reproducible with containerized dependencies
- centralize reusable config instead of copying it across apps
- keep future extension points visible without introducing extra services now

## 2. Package Manager And Workspace Setup

The repository should use `pnpm` workspaces as the default package manager setup.

Why `pnpm`:

- it is monorepo-friendly out of the box
- workspace linking is fast and reliable for shared packages
- it keeps dependency management simple without adding a second orchestration layer too early
- it fits a TypeScript-first `Next.js + NestJS` repository well

Recommended root setup:

- `packageManager` pinned in the root `package.json`
- `pnpm-workspace.yaml` to register `apps/*` and `packages/*`
- shared root scripts for `dev`, `build`, `lint`, `test`, and `typecheck`
- shared TypeScript, lint, and formatting conventions delegated to `packages/config`

## 3. Monorepo Directory Tree

```text
.
├─ .github/
│  └─ workflows/
│     └─ ci.yml
├─ apps/
│  ├─ web/
│  │  ├─ public/
│  │  ├─ src/
│  │  │  ├─ app/
│  │  │  │  ├─ (auth)/
│  │  │  │  │  ├─ login/
│  │  │  │  │  └─ register/
│  │  │  │  ├─ (workspace)/
│  │  │  │  ├─ globals.css
│  │  │  │  └─ layout.tsx
│  │  │  ├─ features/
│  │  │  │  ├─ auth-ui/
│  │  │  │  ├─ chart-workspace/
│  │  │  │  ├─ history-panel/
│  │  │  │  ├─ export-ui/
│  │  │  │  └─ i18n/
│  │  │  ├─ lib/
│  │  │  └─ types/
│  │  ├─ .env.example
│  │  ├─ next.config.ts
│  │  ├─ package.json
│  │  └─ tsconfig.json
│  └─ api/
│     ├─ src/
│     │  ├─ common/
│     │  ├─ modules/
│     │  │  ├─ auth/
│     │  │  ├─ users/
│     │  │  ├─ charts/
│     │  │  ├─ generation/
│     │  │  ├─ exports/
│     │  │  ├─ ai-adapter/
│     │  │  ├─ storage/
│     │  │  └─ platform/
│     │  ├─ app.module.ts
│     │  └─ main.ts
│     ├─ test/
│     ├─ .env.example
│     ├─ nest-cli.json
│     ├─ package.json
│     └─ tsconfig.json
├─ infrastructure/
│  └─ docker/
│     ├─ compose.yaml
│     ├─ postgres/
│     │  └─ init/
│     └─ minio/
│        └─ init/
├─ packages/
│  ├─ ui/
│  │  ├─ src/
│  │  │  ├─ components/
│  │  │  │  └─ core/
│  │  │  ├─ styles/
│  │  │  └─ index.ts
│  │  ├─ package.json
│  │  └─ tsconfig.json
│  └─ config/
│     ├─ eslint/
│     ├─ prettier/
│     ├─ typescript/
│     ├─ env/
│     ├─ package.json
│     └─ README.md
├─ specs/
│  ├─ 01-architecture.md
│  ├─ 02-stack.md
│  └─ 03-scaffold.md
├─ .editorconfig
├─ .env.example
├─ .gitignore
├─ .npmrc
├─ package.json
├─ pnpm-workspace.yaml
├─ README.md
└─ tsconfig.base.json
```

## 4. Responsibilities By Area

### `apps/web`

`apps/web` hosts the `Next.js` App Router frontend. It owns login and registration screens, the main two-pane workspace, chart preview rendering, prompt submission, history interactions, export triggers, and locale-aware UI rendering.

Recommended internal structure:

- `src/app`: route tree, layouts, route groups, and global styles
- `src/features/auth-ui`: forms and session-aware UI flows
- `src/features/chart-workspace`: prompt box, preview state, chart renderer shell
- `src/features/history-panel`: saved chart list and chart selection UI
- `src/features/export-ui`: export button, status UI, and download interactions
- `src/features/i18n`: dictionaries, formatting helpers, and locale wiring
- `src/lib`: API client, auth/session helpers, and small frontend-only utilities

### `apps/api`

`apps/api` hosts the `NestJS` REST API and keeps the modular monolith boundaries explicit from day one.

Recommended module layout:

- `auth`: register, login, logout, session validation, password hashing
- `users`: profile basics and preferences such as locale
- `charts`: create, read, update, list, and delete chart records
- `generation`: prompt validation and orchestration of chart generation
- `exports`: export job orchestration and download metadata
- `ai-adapter`: provider abstraction, prompt templates, response validation
- `storage`: repositories and storage-facing adapters for database and object storage
- `platform`: health checks, logging, config, and rate-limiting hooks

Keep cross-cutting NestJS concerns in `src/common`, such as guards, interceptors, DTO helpers, and shared validation utilities.

### `packages/ui`

`packages/ui` is a frontend-only shared package for design-system primitives and reusable core UI components. It should contain tokens, typography, layout primitives, buttons, inputs, cards, dialogs, and other components shared across auth and workspace screens.

It should not contain business logic, backend code, or runtime service behavior.

### `packages/config`

`packages/config` centralizes reusable repository-level configuration so both apps follow the same standards.

Recommended responsibilities:

- shareable ESLint presets for web, API, and package code
- Prettier configuration
- base and app-specific TypeScript config presets
- env documentation or parsing conventions shared across the monorepo
- short README documenting how each config preset is consumed

### `infrastructure/docker`

`infrastructure/docker` provides local dependency parity, not full deployment orchestration.

Include:

- `PostgreSQL` for relational persistence
- optional `MinIO` for local S3-compatible export testing
- mount points or init folders for startup scripts and seed/bootstrap actions when needed

Do not add Redis, queues, workers, or multi-service orchestration in the initial scaffold.

## 5. Core Bootstrap File List

The scaffold should define the following real starter files so the repository can be bootstrapped without guesswork.

| Path | Purpose |
| --- | --- |
| `package.json` | Root workspace manifest with `packageManager`, workspace scripts, and shared dev tooling entry points. |
| `pnpm-workspace.yaml` | Registers `apps/*` and `packages/*` as workspace members. |
| `tsconfig.base.json` | Base TypeScript defaults shared by all workspaces. |
| `.npmrc` | Consistent `pnpm` and workspace install behavior. |
| `.editorconfig` | Repository-wide whitespace and newline conventions. |
| `.gitignore` | Ignores env files, build outputs, coverage, local storage, and dependency artifacts. |
| `.env.example` | Shared documentation for repo-level variables and handoff notes. |
| `README.md` | Bootstrap instructions, required tools, local startup commands, and repo layout overview. |
| `.github/workflows/ci.yml` | CI entry point for install, lint, typecheck, test, and build verification. |
| `apps/web/package.json` | `Next.js` app manifest and frontend scripts. |
| `apps/web/next.config.ts` | Next.js runtime configuration and safe public env exposure rules. |
| `apps/web/tsconfig.json` | Web app TypeScript config extending the shared base. |
| `apps/web/.env.example` | Public web variables and frontend-local config examples. |
| `apps/web/src/app/layout.tsx` | Global shell, font/theme setup, and i18n bootstrap entry. |
| `apps/web/src/app/(auth)/login/page.tsx` | Login page route entry. |
| `apps/web/src/app/(auth)/register/page.tsx` | Registration page route entry. |
| `apps/web/src/app/(workspace)/page.tsx` | Main workspace entry with history and preview panes. |
| `apps/api/package.json` | `NestJS` app manifest and backend scripts. |
| `apps/api/nest-cli.json` | Nest build and source configuration. |
| `apps/api/tsconfig.json` | API TypeScript config extending the shared base. |
| `apps/api/.env.example` | Private API, database, storage, and AI provider examples. |
| `apps/api/src/main.ts` | API bootstrap, global pipes, version prefix, and runtime startup. |
| `apps/api/src/app.module.ts` | Root module wiring for platform and domain modules. |
| `apps/api/src/modules/platform/health.controller.ts` | `/api/v1/health` endpoint used for smoke tests and runtime checks. |
| `apps/api/src/modules/auth/*` | Authentication controllers, services, DTOs, and guards. |
| `apps/api/src/modules/charts/*` | Chart CRUD endpoints and service layer. |
| `apps/api/src/modules/generation/*` | Prompt orchestration and validated chart generation flow. |
| `apps/api/src/modules/exports/*` | Export request handling and asset reference endpoints. |
| `apps/api/src/modules/ai-adapter/*` | Provider abstraction and schema validation boundaries. |
| `apps/api/src/modules/storage/*` | Repository and storage adapter boundary for database/object storage access. |
| `packages/ui/package.json` | Shared UI package manifest. |
| `packages/ui/tsconfig.json` | UI package TypeScript config. |
| `packages/ui/src/index.ts` | Public exports for shared components and tokens. |
| `packages/ui/src/components/core/*` | Design-system primitives used by the MVP screens. |
| `packages/config/package.json` | Shared config package manifest. |
| `packages/config/typescript/base.json` | Base TS preset for packages and apps. |
| `packages/config/typescript/nextjs.json` | Next.js-specific TS preset. |
| `packages/config/typescript/nestjs.json` | NestJS-specific TS preset. |
| `packages/config/eslint/base.cjs` | Base lint rules shared by the workspace. |
| `packages/config/eslint/next.cjs` | Frontend lint preset. |
| `packages/config/eslint/nest.cjs` | API lint preset. |
| `packages/config/prettier/base.cjs` | Formatting defaults for the monorepo. |
| `packages/config/env/README.md` | Naming rules for env vars, loading rules, and ownership boundaries. |
| `infrastructure/docker/compose.yaml` | Local dependency stack for `PostgreSQL` and optional MinIO. |
| `infrastructure/docker/postgres/init/*` | Database initialization or extension bootstrap scripts if required. |
| `infrastructure/docker/minio/init/*` | Optional local bucket bootstrap scripts for export assets. |

## 6. Environment Variable Design

Environment variables should be documented in example files and split by ownership so secrets do not leak across runtime boundaries.

### 6.1 Root `.env.example`

Use the root example file only for variables shared at repository or developer-tooling level, for example:

- `NODE_ENV`
- `LOG_LEVEL`
- `TZ`

Do not put app secrets here unless both apps truly consume them.

### 6.2 Web App Variables

Document web variables in `apps/web/.env.example`.

Rules:

- only expose browser-safe values with the `NEXT_PUBLIC_` prefix
- keep server-only tokens out of the web app entirely
- prefer pointing the web app at the API through a single base URL variable

Typical web variables:

- `NEXT_PUBLIC_APP_NAME`
- `NEXT_PUBLIC_DEFAULT_LOCALE=zh-CN`
- `NEXT_PUBLIC_API_BASE_URL`

### 6.3 API Variables

Document backend variables in `apps/api/.env.example`.

Group them by concern:

- application: `PORT`, `API_PREFIX=/api/v1`, `APP_ORIGIN`
- auth/session: `SESSION_SECRET`, `SESSION_COOKIE_NAME`, `SESSION_TTL_HOURS`
- database: `DATABASE_URL`
- object storage: `S3_ENDPOINT`, `S3_REGION`, `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`
- AI provider: `LLM_PROVIDER`, `LLM_API_KEY`, `LLM_MODEL`

The API owns all secrets, session credentials, database credentials, and provider keys.

### 6.4 Loading Rules

- load env values separately per app rather than relying on one giant shared runtime file
- commit only example files, never live env files
- keep public frontend config and private backend config in different files
- validate required API env values during backend startup so misconfiguration fails fast
- document local Docker service hostnames that developers should use in app env files

## 7. Scaffold Guidance And Non-Goals

This scaffold is intentionally production-ready at the repository level, but not feature-complete at the product level.

It should include:

- a clean monorepo layout
- real config entry points
- CI and local dependency bootstrap
- explicit boundaries for web, API, UI, and config reuse
- env documentation that supports secure local setup

It should not include:

- Redis
- background job workers
- async queue infrastructure
- microservices
- deployment-specific manifests beyond basic CI and local Docker support

Those remain future extension points once latency, traffic, or operational evidence justifies them.

## 8. Why This Shape Fits The MVP

This scaffold matches the chosen architecture by keeping the runtime split to `web + api + shared storage`, while still giving each major concern a clear home. `apps/web` owns presentation, `apps/api` owns orchestration and persistence boundaries, `packages/ui` keeps the design system reusable, and `packages/config` prevents config drift across the monorepo.

Using `pnpm` workspaces plus shared config keeps the repository easy to bootstrap and maintain. Local Docker support for `PostgreSQL` and optional MinIO provides enough environment parity for the MVP without prematurely adding infrastructure that the current specs explicitly defer.
