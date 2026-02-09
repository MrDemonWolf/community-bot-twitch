# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Community Bot for MrDemonWolf, Inc. — a Twitch chat bot built with TypeScript, @twurple/chat, @twurple/auth, Express, and Prisma (PostgreSQL).

## Common Commands

```bash
# Install dependencies (uses pnpm via fnm)
pnpm install

# Development with hot reload
pnpm dev

# Build (cleans dist/ then compiles TypeScript)
pnpm build

# Production
pnpm start

# Lint
pnpm lint

# Schema sync (from monorepo)
pnpm prisma:sync    # Pull models from monorepo → prisma/schema.prisma

# Database commands
pnpm db:generate    # Generate Prisma Client after schema changes
pnpm db:push        # Push schema to database (no migration)
pnpm db:migrate     # Run Prisma migrations
pnpm db:studio      # Open Prisma Studio GUI
pnpm db:import      # Import commands from prisma/commands.json

# Tests
pnpm test           # Runs mocha tests with NODE_ENV=test

# Start infrastructure (PostgreSQL + Redis)
docker compose up -d
```

**Shell note:** This project uses zsh with fnm for Node version management. When running pnpm via Bash tool, use `eval "$(fnm env --shell zsh)" && pnpm <command>`.

## Architecture

**Entry point:** `src/app.ts` — async `main()` that connects to the database, starts the Express API server, creates a Twurple auth provider and chat client, registers event handlers, and connects to Twitch chat.

**Key layers:**
- `src/twitch/auth.ts` — `createAuthProvider()` returns `{ authProvider, botUsername }`. Validates stored tokens on startup, auto-refreshes if expired, deletes dead tokens and triggers device flow as last resort. Priority: stored DB credentials (validate → refresh → delete) > env vars > Device Code Flow.
- `src/twitch/deviceAuth.ts` — Implements Twitch Device Code Flow for first-run authentication. Shows a link, polls for authorization with progress indicator.
- `src/twitch/chat.ts` — `createChatClient(authProvider, botUsername)` creates a `ChatClient` joining the bot's own channel + the `TWITCH_CHANNEL` env var.
- `src/events/connected.ts` — Handles authentication success/failure, connect/disconnect. Syncs channels to DB on auth success.
- `src/events/message.ts` — 3-phase command pipeline: built-in → DB prefix → DB regex. Handles mute state (only `!bot unmute` allowed when muted).
- `src/events/join.ts` — Logs user joins/join failures, tracks chatters for `${random.chatter}`.
- `src/events/part.ts` — Logs user parts, removes from chatter tracking.
- `src/commands/index.ts` — `Map<string, TwitchCommand>` built-in command registry (ping, uptime, accountage, bot, queue, filesay, command, reloadcommands).
- `src/types/command.ts` — `TwitchCommand` interface.
- `src/services/commandCache.ts` — Loads DB commands into memory with prefix map (O(1) lookup) and regex array. Auto-reloads every 60s.
- `src/services/accessControl.ts` — Access level hierarchy (EVERYONE → SUBSCRIBER → REGULAR → VIP → MODERATOR → BROADCASTER) + regulars cache.
- `src/services/cooldownManager.ts` — In-memory global and per-user cooldown tracking. Mods/broadcasters bypass.
- `src/services/commandExecutor.ts` — Variable substitution ({user}, {channel}, {args}, ${N|fallback}, ${random.pick}, ${random.chatter}, ${time}) + SAY/MENTION/REPLY dispatch.
- `src/services/streamStatusManager.ts` — Polls Twitch Helix streams API every 60s. Tracks live state, title, start time.
- `src/services/queueManager.ts` — Viewer queue with open/closed/paused states, join/leave/pick/remove/clear operations.
- `src/services/helixClient.ts` — Generic Twitch Helix API wrapper using stored credentials.
- `src/services/botState.ts` — In-memory mute state for the bot.
- `src/services/chatterTracker.ts` — Per-channel active chatter tracking for ${random.chatter}.
- `src/scripts/importCommands.ts` — Imports commands from `prisma/commands.json` into the database via upsert.
- `src/api/` — Express server with Helmet, Morgan, CORS. Routes in `src/api/routes/`. Status endpoint at `GET /status`.
- `src/utils/env.ts` — Zod-validated environment variables. The process exits immediately if validation fails.
- `src/utils/commandLogger.ts` — Logging helpers using consola (info, success, error, warn).
- `src/database/index.ts` — Singleton Prisma Client using `@prisma/adapter-pg` driver adapter (stored on `globalThis` in non-production to prevent multiple instances during hot reload).

**Database:** PostgreSQL via Prisma v7. **DO NOT edit `prisma/schema.prisma` directly.** The source of truth for all Prisma models is the monorepo at `../community-bot/packages/db/prisma/schema/`. To sync after schema changes in the monorepo:
```bash
pnpm prisma:sync        # Pull models from monorepo → prisma/schema.prisma
pnpm db:generate        # Regenerate the Prisma client
```
To add/modify models, edit the `.prisma` files in `../community-bot/packages/db/prisma/schema/`, then run `pnpm prisma:sync && pnpm db:generate` here.

**Prisma v7 setup:**
- `prisma.config.ts` — Defines datasource URL (via `DATABASE_URL` env var) for Prisma CLI (migrate, db push, etc.)
- `prisma/schema.prisma` — Schema file with `engineType = "client"` (no Rust engine), `url` removed from datasource block
- `src/database/index.ts` — Uses `@prisma/adapter-pg` with `PrismaPg` adapter for the PrismaClient constructor
- All imports from Prisma generated client use `../generated/prisma/client` (not `../generated/prisma`)

Schema in `prisma/schema.prisma` with models:
- `DiscordGuild` — Discord server associations (with TwitchChannel and TwitchNotification relationships)
- `TwitchChannel` — tracks joined Twitch channels (compound unique on twitchChannelId + guildId)
- `TwitchNotification` — tracks notification messages sent to Discord
- `TwitchCredential` — stores Twitch OAuth tokens with userId, scope, and obtainment timestamp
- `TwitchChatCommand` — database-driven commands with response, cooldowns, access levels, aliases, regex, stream status filters, keywords
- `TwitchRegular` — users with the REGULAR access level (between SUBSCRIBER and VIP)
- `QueueEntry` — viewer queue entries with position ordering
- `QueueState` — singleton queue state (OPEN/CLOSED/PAUSED)

**Seed data:** `prisma/commands.json` contains legacy commands for import via `pnpm db:import`. No seed.js — the import script is at `src/scripts/importCommands.ts`.

**Documentation:**
- `README.md` — Project overview, features, usage, and development setup (FluffBoost layout)
- `COMMANDS.md` — Detailed reference for all 8 built-in commands with examples
- `docs/DATABASE_COMMANDS.md` — Full database command system docs (fields, variables, access levels, regex, cooldowns, stream filtering)
- `NOTES.md` — Migration notes and variable reference from the old bot

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
- **Package manager:** pnpm (via fnm)
- **Language:** TypeScript (strict mode, ESNext target, CommonJS modules)
- **Bot framework:** @twurple/chat + @twurple/auth v7
- **API:** Express v5
- **ORM:** Prisma v7 (PostgreSQL) with `@prisma/adapter-pg` driver adapter (no Rust engine)
- **Validation:** Zod
- **Logging:** consola
- **Scheduling:** node-cron
