# Stack Selection

## 1. Decision Criteria

The MVP stack should follow the architecture in `specs/01-architecture.md`:

- keep a modular monolith
- keep the runtime split simple: `web + api + shared storage`
- use mature technology with strong docs and ecosystem support
- support `zh-CN`, design-system-based UI, and easy future scaling
- avoid unnecessary complexity in the MVP

The team is already familiar with `Next.js`, `NestJS`, and `TypeScript`, so team familiarity is also a practical factor for delivery speed.

## 2. Tech Stack Options

### Option A: Next.js + NestJS + PostgreSQL

- `frontend:` `Next.js` (App Router, TypeScript)
- `backend:` `NestJS` (TypeScript, REST API)
- `database:` `PostgreSQL`
- `infra:` `Docker Compose` for local dev, `GitHub Actions` for CI/CD, S3-compatible object storage for exports

Why it fits:

- Best match with the architecture spec, which already assumes `Next.js` and `NestJS`
- One language across frontend and backend reduces context switching
- Strong module structure for auth, generation, charts, exports, and platform concerns
- Excellent ecosystem support for auth, validation, testing, and AI-assisted coding

### Option B: Next.js + Fastify + PostgreSQL

- `frontend:` `Next.js` (App Router, TypeScript)
- `backend:` `Fastify` (TypeScript, REST API)
- `database:` `PostgreSQL`
- `infra:` `Docker Compose` for local dev, `GitHub Actions` for CI/CD, S3-compatible object storage for exports

Why it fits:

- Keeps the same frontend and database shape as the architecture
- Lighter backend runtime and fast request handling
- Still mature and TypeScript-friendly

Trade-off:

- Faster at the framework level, but the team must build more structure and conventions themselves compared with `NestJS`

### Option C: Laravel + Inertia/Vue + PostgreSQL

- `frontend:` `Vue 3` with `Inertia.js`
- `backend:` `Laravel`
- `database:` `PostgreSQL`
- `infra:` `Docker Compose` for local dev, `GitHub Actions` for CI/CD, S3-compatible object storage for exports

Why it fits:

- Very mature full-stack ecosystem
- Strong developer productivity for auth, CRUD flows, and admin-style features
- Good operational simplicity for an MVP

Trade-off:

- Weaker fit for the TypeScript-first frontend/backend split described in the architecture
- Lower leverage from the team's stated familiarity with `Next.js`, `NestJS`, and `TypeScript`

## 3. Comparison

| Option | Dev speed | Scalability | Cost | AI friendliness | Notes |
| --- | --- | --- | --- | --- | --- |
| `Next.js + NestJS + PostgreSQL` | High | High | Medium | High | Best balance of convention, team fit, and future growth |
| `Next.js + Fastify + PostgreSQL` | Medium-High | High | Medium-Low | High | Lean runtime, but more backend design work for the team |
| `Laravel + Inertia/Vue + PostgreSQL` | Medium | Medium-High | Medium | Medium | Mature, but less aligned with the current TypeScript architecture |

### Dev Speed

- **Option A** is fastest for this team because the architecture already maps directly to `Next.js` + `NestJS`, reducing decision overhead.
- **Option B** is still fast, but backend structure, validation patterns, and module boundaries need more manual design.
- **Option C** is productive in general, but switching the frontend/backend approach would slow down this project.

### Scalability

- **Option A** scales well for the target `10k` users with stateless web/api services and a clear modular backend.
- **Option B** can scale just as well technically, especially on API throughput, but discipline is needed to keep the codebase modular.
- **Option C** is scalable enough for MVP, but it is a weaker fit for the explicitly separated `web + api` architecture.

### Cost

- All three options are reasonable for MVP when deployed as containers with managed `PostgreSQL` and object storage.
- **Option B** may be slightly cheaper at runtime because of a leaner backend stack.
- **Option A** keeps cost low enough while saving engineering time, which matters more than small infrastructure savings at MVP stage.

### AI Friendliness

- **Option A** is the strongest because `Next.js`, `NestJS`, and `PostgreSQL` have abundant examples, templates, and stable patterns in AI coding tools.
- **Option B** is also AI-friendly, but generated backend code is more likely to vary because Fastify projects have fewer shared architectural conventions.
- **Option C** is well supported, but it reduces consistency with the TypeScript-heavy architecture and team context.

## 4. Recommended MVP Stack

### Selected Stack

- `frontend:` `Next.js`
- `backend:` `NestJS`
- `database:` `PostgreSQL`
- `infra:` `Docker Compose` for local development, `GitHub Actions` for CI/CD, S3-compatible object storage for exported images

### Why This Is The Best MVP Choice

`Next.js + NestJS + PostgreSQL` is the best MVP stack because it matches the existing architecture almost one-to-one, uses mature technology, and avoids unnecessary complexity. It also gives the team the highest delivery speed because the team already knows these tools.

This stack keeps the frontend and backend in one language, which improves maintainability and AI-assisted development. It is also easy to scale later: the web and API can stay stateless, `PostgreSQL` remains the source of truth, and object storage handles exported assets cleanly.

### MVP Guidance

For MVP, keep the infrastructure intentionally simple:

- one `Next.js` web app
- one `NestJS` API
- one `PostgreSQL` database
- one S3-compatible storage bucket for exported chart images
- `Docker Compose` for local environment parity
- `GitHub Actions` for lint, test, build, and deployment checks

Do not add Redis, queues, background workers, or microservices until real traffic or latency data shows they are necessary.
