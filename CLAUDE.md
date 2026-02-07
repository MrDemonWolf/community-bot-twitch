# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Community Bot for MrDemonWolf, Inc. — a Twitch chat bot built with TypeScript, @twurple/chat, @twurple/auth, Express, and Prisma (PostgreSQL).

## Common Commands

```bash
# Install dependencies (uses pnpm)
pnpm install

# Development with hot reload
pnpm dev

# Build (cleans dist/ then compiles TypeScript)
pnpm build

# Production
pnpm start

# Lint
pnpm lint

# Database commands
pnpm db:generate    # Generate Prisma Client after schema changes
pnpm db:push        # Push schema to database (no migration)
pnpm db:migrate     # Run Prisma migrations
pnpm db:studio      # Open Prisma Studio GUI

# Tests
pnpm test           # Runs mocha tests with NODE_ENV=test

# Start infrastructure (PostgreSQL + Redis)
docker compose up -d
```

## Architecture

**Entry point:** `src/app.ts` — async `main()` that connects to the database, starts the Express API server, creates a Twurple auth provider and chat client, registers event handlers, and connects to Twitch chat.

**Key layers:**
- `src/twitch/auth.ts` — `createAuthProvider()` returns `{ authProvider, botUsername }`. Validates stored tokens on startup, auto-refreshes if expired, deletes dead tokens and triggers device flow as last resort. Priority: stored DB credentials (validate → refresh → delete) > env vars > Device Code Flow.
- `src/twitch/deviceAuth.ts` — Implements Twitch Device Code Flow for first-run authentication. Shows a link, polls for authorization with progress indicator.
- `src/twitch/chat.ts` — `createChatClient(authProvider, botUsername)` creates a `ChatClient` joining the bot's own channel + the `TWITCH_CHANNEL` env var.
- `src/events/connected.ts` — Handles authentication success/failure, connect/disconnect. Syncs channels to DB on auth success.
- `src/events/message.ts` — Parses `!` prefix commands and routes to the command registry.
- `src/events/join.ts` — Logs user joins and join failures.
- `src/events/part.ts` — Logs user parts.
- `src/commands/index.ts` — `Map<string, TwitchCommand>` command registry.
- `src/commands/ping.ts` — Example `!ping` → `@user Pong!` command.
- `src/types/command.ts` — `TwitchCommand` interface.
- `src/api/` — Express server with Helmet, Morgan, CORS. Routes in `src/api/routes/`. Status endpoint at `GET /status`.
- `src/utils/env.ts` — Zod-validated environment variables. The process exits immediately if validation fails.
- `src/utils/commandLogger.ts` — Logging helpers using consola (info, success, error, warn).
- `src/database/index.ts` — Singleton Prisma Client (stored on `globalThis` in non-production to prevent multiple instances during hot reload).

**Database:** PostgreSQL via Prisma. Schema in `prisma/schema.prisma` with two models:
- `TwitchChannel` — tracks joined Twitch channels
- `TwitchCredential` — stores Twitch OAuth tokens with userId, scope, and obtainment timestamp

**Infrastructure:** `docker-compose.yml` provides PostgreSQL 16 (port 5432) and Redis 7.2 (port 6379).

## Environment Variables

Validated via Zod in `src/utils/env.ts`. Required:
- `DATABASE_URL` — PostgreSQL connection string (must start with "postgres")
- `TWITCH_APPLICATION_CLIENT_ID` — Twitch OAuth client ID
- `TWITCH_APPLICATION_CLIENT_SECRET`
- `TWITCH_CHANNEL` — the streamer channel to join (bot always auto-joins its own channel)

Optional:
- `INIT_TWITCH_ACCESS_TOKEN` — skip Device Code Flow with a pre-existing token
- `INIT_TWITCH_REFRESH_TOKEN` — paired with access token above
- `HOST` (default: "localhost"), `PORT` (default: 3000) — set in `src/api/index.ts`

## Tech Stack

- **Runtime:** Node.js (22 in Docker)
- **Package manager:** pnpm
- **Language:** TypeScript (strict mode, ESNext target, CommonJS modules)
- **Bot framework:** @twurple/chat + @twurple/auth v7
- **API:** Express v5
- **ORM:** Prisma v6 (PostgreSQL)
- **Validation:** Zod
- **Logging:** consola
- **Scheduling:** node-cron
