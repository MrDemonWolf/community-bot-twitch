# Community Bot for MrDemonWolf, Inc. - Twitch

A Twitch chat bot built with TypeScript, [@twurple](https://twurple.js.org/), Express, and Prisma (PostgreSQL).

---

## Prerequisites

- [Node.js](https://nodejs.org/) v22 or later
- [pnpm](https://pnpm.io/) package manager
- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) (for PostgreSQL and Redis)
- A [Twitch Developer Application](https://dev.twitch.tv/console/apps)

---

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/mrdemonwolf/community-bot-twitch.git
cd community-bot-twitch
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Start the database

Docker Compose provides PostgreSQL 16 and Redis 7.2:

```bash
docker compose up -d
```

This starts:
- **PostgreSQL** on port `5432` (user: `postgres`, password: `postgres`, db: `community-bot`)
- **Redis** on port `6379`

### 4. Create a Twitch Application

1. Go to the [Twitch Developer Console](https://dev.twitch.tv/console/apps)
2. Click **Register Your Application**
3. Fill in the details:
   - **Name**: Whatever you want to call your bot
   - **OAuth Redirect URLs**: `https://id.twitch.tv/oauth2/device` (required for device code flow)
   - **Category**: Chat Bot
4. Click **Create**
5. On the application page, copy the **Client ID**
6. Click **New Secret** and copy the **Client Secret**

### 5. Configure environment variables

Create a `.env` file in the project root:

```env
# Database (matches docker-compose defaults)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/community-bot"

# Twitch Application (from step 4)
TWITCH_APPLICATION_CLIENT_ID=your-client-id-here
TWITCH_APPLICATION_CLIENT_SECRET=your-client-secret-here

# Streamer channel to join (the bot always joins its own channel automatically)
TWITCH_CHANNEL=mrdemonwolf

# Optional: API server config
# HOST=localhost
# PORT=3000
```

> **Note:** You do NOT need to provide access/refresh tokens. The bot uses the Twitch Device Code Flow to authenticate on first run (see below).

### 6. Push the database schema

```bash
pnpm db:push
```

### 7. Start the bot

```bash
pnpm dev
```

---

## First-Run Authentication (Device Code Flow)

On the first run (when no credentials are stored in the database), the bot will automatically start the **Twitch Device Code Flow**:

1. The bot prints a link to your terminal
2. Open the link in your browser
3. Log in with the **Twitch account you want the bot to use**
4. Click **Authorize**

The bot detects the authorization, saves the tokens to the database, and connects to Twitch chat.

On subsequent runs, the bot validates the stored token on startup. If the token has expired, it automatically refreshes it. The device code flow only triggers again if both the access token and refresh token are completely dead.

> **Tip:** If you want to re-authenticate (e.g., switch to a different Twitch account), delete the credentials from the `TwitchCredential` table in the database and restart the bot.

---

## Commands

### Built-in Commands

These are hardcoded commands that always exist:

| Command | Aliases | Access | Description |
|---------|---------|--------|-------------|
| `!ping` | — | Everyone | Replies with `@user Pong!` |
| `!uptime` | — | Everyone | Shows stream uptime if live, or how long the stream has been offline |
| `!accountage` | `!accage`, `!created` | Everyone | Shows when a Twitch account was created. Usage: `!accountage` or `!accountage @username` |
| `!bot` | — | Broadcaster | Mute/unmute the bot. `!bot mute` silences all responses (except `!bot unmute`). `!bot unmute` re-enables responses |
| `!queue` | — | Everyone (mod commands require mod+) | Viewer queue system (see [Queue System](#queue-system) below) |
| `!filesay` | — | Broadcaster | Fetches a text file from a URL and sends each line to chat with a 1-second delay. Usage: `!filesay <url>` |
| `!command` | — | Moderator+ | Manage database commands from chat (see [Managing Commands from Chat](#managing-commands-from-chat) below) |
| `!reloadcommands` | — | Moderator+ | Reloads commands and regulars from the database immediately |

To add new built-in commands, create a file in `src/commands/` and register it in `src/commands/index.ts`.

### Queue System

A full viewer queue with open/close/pause states. Viewers can join, leave, and check their position. Mods and broadcasters can manage the queue.

**Viewer commands:**

| Command | Description |
|---------|-------------|
| `!queue join` | Join the queue (must be open) |
| `!queue leave` | Leave the queue |
| `!queue position` | Check your position in the queue |
| `!queue list` | View the first 10 entries + total count |

**Mod/Broadcaster commands:**

| Command | Description |
|---------|-------------|
| `!queue open` | Open the queue for joins |
| `!queue close` | Close the queue |
| `!queue pause` | Pause the queue (no new joins) |
| `!queue unpause` | Resume the queue |
| `!queue pick next` | Pick the next person in line |
| `!queue pick random` | Pick a random person from the queue |
| `!queue pick <username>` | Pick a specific person |
| `!queue remove <username>` | Remove a user from the queue |
| `!queue clear` | Clear all queue entries |

### Managing Commands from Chat

Mods and broadcasters can create and manage database commands directly from chat using `!command`:

| Command | Description |
|---------|-------------|
| `!command add <name> <response>` | Create a new command |
| `!command edit <name> <response>` | Update a command's response |
| `!command remove <name>` | Delete a command |
| `!command show <name>` | Display command details |
| `!command options <name> [flags...]` | Modify command properties |

**Flags for `!command options`:**

| Flag | Description |
|------|-------------|
| `-cd <seconds>` | Set global cooldown |
| `-usercd <seconds>` | Set per-user cooldown |
| `-level <access_level>` | Set required access level |
| `-type <say\|mention\|reply>` | Set response type |
| `-enable` / `-disable` | Toggle enabled state |
| `-hidden` / `-visible` | Toggle visibility |
| `-stream <online\|offline\|both>` | Set stream status filter |
| `-limituser <username\|clear>` | Restrict to a specific user |
| `-alias add <name>` | Add an alias |
| `-alias remove <name>` | Remove an alias |

> **Note:** You cannot create a command with the same name as a built-in command.

### Database Commands

The bot supports a full database-driven command system. Commands stored in the `TwitchChatCommand` table are loaded into memory on startup and can be managed without restarting the bot — either from chat via `!command` or through Prisma Studio.

### Command Execution Pipeline

When a message arrives in chat, it goes through a 3-phase pipeline. The first match wins:

1. **Phase 1: Built-in commands** — Checks the `!` prefix against hardcoded commands. Always runs (except when muted, only `!bot unmute` is allowed).
2. **Phase 2: Database prefix commands** — Looks up the `!` prefix in the command cache (by name or alias). Checks access level, cooldowns, stream status, keywords, and limitToUser.
3. **Phase 3: Database regex commands** — Tests the full message against compiled regex patterns. Same checks as Phase 2.

### Database Commands

#### Adding Commands via Prisma Studio

Use Prisma Studio to manage commands through a GUI:

```bash
pnpm db:studio
```

Or insert directly into the database. Here's what each field does:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `name` | String | *required* | Trigger name without the `!` prefix (e.g., `hello`) |
| `enabled` | Boolean | `true` | Whether the command is active |
| `response` | String | *required* | Text to send. Supports variables: `{user}`, `{channel}`, `{args}` |
| `responseType` | Enum | `SAY` | How to respond: `SAY`, `MENTION`, or `REPLY` (see below) |
| `globalCooldown` | Int | `0` | Cooldown in seconds shared across all users |
| `userCooldown` | Int | `0` | Cooldown in seconds per user |
| `accessLevel` | Enum | `EVERYONE` | Minimum role required (see below) |
| `limitToUser` | String? | `null` | If set, only this username can trigger the command |
| `streamStatus` | Enum | `BOTH` | When the command is active: `ONLINE`, `OFFLINE`, or `BOTH` |
| `hidden` | Boolean | `false` | For future GUI filtering |
| `aliases` | String[] | `[]` | Alternative trigger names (e.g., `["hi", "hey"]`) |
| `keywords` | String[] | `[]` | Stream title keywords — command only active when title contains at least one |
| `regex` | String? | `null` | If set, triggers on pattern match instead of `!prefix` |

#### Response Types

| Type | Behavior | Example Output |
|------|----------|----------------|
| `SAY` | Sends a plain message | `Hello world!` |
| `MENTION` | Prefixes with @username | `@user Hello world!` |
| `REPLY` | Sends as a threaded reply | *(reply to user's message)* `Hello world!` |

#### Response Variables

Use these placeholders in the `response` field:

| Variable | Replaced With | Example |
|----------|---------------|---------|
| `{user}` | Username of the person who triggered the command | `Hey {user}!` → `Hey coolviewer!` |
| `{channel}` | Channel name where the command was used | `Welcome to {channel}!` → `Welcome to mrdemonwolf!` |
| `{args}` | Everything the user typed after the command name | `!cmd hello world` → `{args}` = `hello world` |
| `${1}`, `${2}`, etc. | Positional argument (1-indexed) | `!cmd foo bar` → `${1}` = `foo`, `${2}` = `bar` |
| `${1\|fallback}` | Positional argument with a default fallback | `${1\|@mrdemonwolf}` → uses `@mrdemonwolf` if no arg given |
| `${random.pick '...' '...'}` | Random choice from a quoted list | `${random.pick 'hi' 'hello' 'hey'}` → one at random |
| `${random.chatter}` | A random active user currently in the channel | `Shoutout to ${random.chatter}!` |
| `${time <timezone>}` | Current time in the given timezone | `${time America/Chicago}` → `3:45:00 PM` |

**Example:** A command with response `Hey {user}, welcome to {channel}!` and type `SAY` would output: `Hey coolviewer, welcome to mrdemonwolf!`

#### Access Levels

Access levels follow a hierarchy — higher levels include all permissions of lower levels:

| Level | Rank | Who |
|-------|------|-----|
| `EVERYONE` | 0 | All users |
| `SUBSCRIBER` | 1 | Subscribers and founders |
| `REGULAR` | 2 | Users in the `TwitchRegular` table (see below) |
| `VIP` | 3 | VIPs |
| `MODERATOR` | 4 | Moderators (also bypass cooldowns) |
| `BROADCASTER` | 5 | The channel owner (also bypasses cooldowns) |

#### Regex Commands

If the `regex` field is set, the command ignores the `!prefix` system entirely. Instead, it tests the **full message text** against the regex pattern. This is useful for auto-responses.

**Example:** A command with `regex` set to `gg` and response `GG {user}!` would trigger whenever someone types a message containing "gg".

#### Cooldowns

- **Global cooldown** — after any user triggers the command, it's locked for everyone for N seconds
- **User cooldown** — after a specific user triggers it, only that user is locked for N seconds
- Moderators and broadcasters bypass all cooldowns

#### Stream Status Filtering

| Value | Command Active When |
|-------|---------------------|
| `BOTH` | Always |
| `ONLINE` | Stream is live |
| `OFFLINE` | Stream is offline |

If `keywords` are set, the command additionally requires the stream title to contain at least one of the keywords.

### Managing Regulars

The `TwitchRegular` table defines users who get the REGULAR access level (rank 2, between SUBSCRIBER and VIP). Manage them via Prisma Studio:

```bash
pnpm db:studio
```

Each regular needs:

| Field | Description |
|-------|-------------|
| `twitchUserId` | The user's Twitch ID |
| `twitchUsername` | Display name (for reference) |
| `addedBy` | Who added them (for record keeping) |

### Reloading Without Restart

Commands and regulars are automatically reloaded from the database every 60 seconds. To reload immediately, type `!reloadcommands` in chat (mod/broadcaster only).

---

## Prisma Schema Sync

**Do NOT edit `prisma/schema.prisma` directly.** The source of truth for all Prisma models is the monorepo at `../community-bot/packages/db/prisma/schema/`.

To sync after schema changes in the monorepo:

```bash
pnpm prisma:sync    # Pull models from monorepo → prisma/schema.prisma
pnpm db:generate    # Regenerate the Prisma client
```

To add or modify models, edit the `.prisma` files in `../community-bot/packages/db/prisma/schema/`, then run the commands above.

---

## Common Commands

```bash
# Development with hot reload
pnpm dev

# Build for production
pnpm build

# Run production build
pnpm start

# Lint
pnpm lint

# Schema sync
pnpm prisma:sync    # Sync schema from monorepo (../community-bot)

# Database
pnpm db:generate    # Regenerate Prisma Client after schema changes
pnpm db:push        # Push schema to database (no migration files)
pnpm db:migrate     # Run Prisma migrations
pnpm db:studio      # Open Prisma Studio GUI

# Tests
pnpm test
```

---

## API

The bot runs an Express API server (default: `http://localhost:3000`).

| Endpoint | Description |
|----------|-------------|
| `GET /status` | Returns the bot's current status (`offline`, `connecting`, or `online`) |

---

## Project Structure

```
src/
  app.ts                    # Entry point — starts DB, API, auth, chat
  api/                      # Express server (Helmet, Morgan, CORS)
    routes/status.ts        # GET /status endpoint
  commands/
    index.ts                # Built-in command registry
    ping.ts                 # !ping → @user Pong!
    uptime.ts               # !uptime → stream uptime or offline duration
    accountage.ts           # !accountage → Twitch account creation date
    bot.ts                  # !bot mute/unmute → mute/unmute the bot
    queue.ts                # !queue → viewer queue system
    filesay.ts              # !filesay <url> → read file lines to chat
    command.ts              # !command add/edit/remove/show/options → manage DB commands
    reloadCommands.ts       # !reloadcommands → reload commands + regulars from DB
  database/
    index.ts                # Prisma client singleton
  events/
    connected.ts            # Auth success/failure, connect/disconnect handlers
    message.ts              # 3-phase command pipeline (built-in → DB prefix → DB regex)
    join.ts                 # User join/join-failure logging + chatter tracking
    part.ts                 # User part logging + chatter tracking
  services/
    commandCache.ts         # Loads DB commands into memory with prefix map + regex array
    accessControl.ts        # Access level hierarchy + regulars cache
    cooldownManager.ts      # In-memory global and per-user cooldown tracking
    commandExecutor.ts      # Variable substitution + SAY/MENTION/REPLY dispatch
    streamStatusManager.ts  # Twitch Helix stream polling (live/offline + title)
    queueManager.ts         # Viewer queue (join/leave/pick/open/close/pause)
    helixClient.ts          # Generic Twitch Helix API wrapper
    botState.ts             # In-memory bot mute state
    chatterTracker.ts       # Per-channel active chatter tracking
  twitch/
    auth.ts                 # RefreshingAuthProvider with DB persistence
    chat.ts                 # ChatClient factory
    deviceAuth.ts           # Twitch Device Code Flow
    index.ts                # Barrel export
  types/
    command.ts              # TwitchCommand interface
  utils/
    env.ts                  # Zod-validated env vars
    commandLogger.ts        # Command execution logger
```

---

## License

![GitHub license](https://img.shields.io/github/license/MrDemonWolf/community-bot-twitch.svg?style=for-the-badge&logo=github)

---

## Contact

If you have any questions, suggestions, or feedback, feel free to reach out!

- Discord: [Join our server](https://mrdwolf.com/discord)

Made with love by [MrDemonWolf, Inc.](https://www.mrdemonwolf.com)
