# Charts Generator

Monorepo scaffold for the Charts Generator MVP.

## Stack

- Web: Next.js (TypeScript)
- API: NestJS (TypeScript)
- Shared UI: Workspace package with core components and tokens
- Local infra: Docker Compose (PostgreSQL + MinIO)

## Quick Start

1. Install dependencies:
   - `pnpm install`
2. Copy env templates:
   - `copy .env.example .env`
   - `copy apps\\web\\.env.example apps\\web\\.env.local`
   - `copy apps\\api\\.env.example apps\\api\\.env`
3. Start local dependencies:
   - `docker compose up -d`
4. Start apps:
   - `pnpm dev`

## Scripts

- `pnpm dev`
- `pnpm build`
- `pnpm lint`
- `pnpm test`
- `pnpm typecheck`
