# Todo

[] Create a command for the server owner aka they need amdin permission to set streamer name

# Add more to this list for features

---

# Variable Reference (Migration from Old Bot)

## Currently Supported Variables

These work right now in the `response` field of `TwitchChatCommand`:

| Variable | Description | Example |
|----------|-------------|---------|
| `{user}` | Username of the person who triggered the command | `Hey {user}!` → `Hey coolviewer!` |
| `{channel}` | Channel name where the command was used | `Welcome to {channel}!` → `Welcome to mrdemonwolf!` |
| `{args}` | Everything the user typed after the command | `!cmd hello world` → `{args}` = `hello world` |

## Old Bot Variables Found in Imported Commands

These were found in the old command JSON export. Commands using unsupported variables were imported as-is (the `${...}` text will print literally until support is added).

### Mapped (converted during import)

| Old Format | New Format | Used In | Notes |
|------------|-----------|---------|-------|
| `${user}` | `{user}` | lurk, lastseen | Triggering username |
| `${sender}` | `{user}` | hug, ram | Same as `${user}` — just an alias |
| `${channel}` | `{channel}` | time, win | Channel name |
| `${channel.display_name}` | `{channel}` | dragonsquish, stepladder, steppies | Display name with casing — mapped to `{channel}` |
| `${1\|@${channel.display_name}}` | `{args}` | dragonsquish, stepladder, steppies | First argument or default — mapped to `{args}` (no default fallback) |

### Not Supported (need future implementation)

| Old Format | Used In | What It Does | Implementation Idea |
|------------|---------|--------------|---------------------|
| `${time America/Chicago}` | time | Current time in a timezone | Use `Intl.DateTimeFormat` with the timezone string |
| `${lasttweet.twitchsupport}` | twitchsupport | Last tweet from a Twitter account | External API call (Twitter/X API or scraper) |
| `${user.lastseen}` | lastseen | When user was last seen in channel | Requires user tracking table with last-seen timestamps |
| `${user.lastactive}` | lastseen | When user was last active in chat | Same tracking table, update on message |
| `${user.lastmessage}` | lastseen | User's last chat message | Store last message per user in DB |
| `${getcount <name>}` | win | Read a named counter value | Requires a `TwitchCounter` table (name + value) |
| `${count <name>}` | addwin | Increment a named counter and return new value | Same counter table with increment |
| `${count <name> -1}` | delwin | Decrement a named counter | Same counter table with decrement |
| `${count <name> 0}` | resetwin | Reset a named counter to a value | Same counter table with set |
| `${repeat <n> <text>}` | dance | Repeat text/emote N times | String repeat in variable substitution |
| `${random.pick '...' '...'}` | hug | Pick one random option from a list | Parse quoted strings, pick random |
| `${random.chatter}` | hug | Pick a random active chatter | Requires tracking active chatters in memory |
| `$(weather <zip>)` | weather | Weather lookup by zip code | External weather API (OpenWeatherMap, etc.) |
| `${1\|'default'}` | weather, hug | First argument with a default fallback | Parse `{args}` with default value support |

### Priority Suggestions

**Quick wins** (no external APIs, no new DB tables):
1. `${repeat <n> <text>}` — pure string manipulation
2. `${random.pick '...' '...'}` — parse + Math.random
3. `${time <timezone>}` — built-in `Intl.DateTimeFormat`
4. `${1|'default'}` — args with default fallback

**Medium effort** (needs a new DB table):
5. `${getcount}` / `${count}` — counter system (new `TwitchCounter` model)

**Larger effort** (needs user tracking + memory):
6. `${user.lastseen}` / `${user.lastactive}` / `${user.lastmessage}` — user activity tracking
7. `${random.chatter}` — active chatter tracking in memory

**External dependency** (needs API keys / services):
8. `$(weather)` — weather API integration
9. `${lasttweet}` — Twitter/X API (likely deprecated/difficult)
