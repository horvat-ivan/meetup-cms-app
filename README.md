# meetup-cms-app

Engineering repo for the Meetup CMS demo. Built with TanStack Start (FE) + NestJS (BE) + Postgres + Drizzle.

## Quickstart

```bash
# 1. Install
pnpm install

# 2. Start Postgres
docker-compose up -d

# 3. Migrate + seed
cp .env.example .env
pnpm db:migrate
pnpm db:seed

# 4. Run both apps
pnpm dev
```

- FE: http://localhost:3000
- API: http://localhost:4000

## Stack

- FE: TanStack Start, React 19, Tailwind v4
- BE: NestJS 11, Drizzle ORM
- DB: Postgres 16 (docker)
- Workspace: pnpm + turbo

## Spec

Full multirepo workflow: `meetup-cms-product/docs/architecture/`.
