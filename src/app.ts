import consola from "consola";
import cron from "node-cron";

import { env } from "./utils/env";
import { prisma, prismaConnect } from "./database";
import api from "./api";
import { createAuthProvider, createChatClient } from "./twitch";
import { registerConnectionEvents } from "./events/connected";
import { registerMessageEvents } from "./events/message";
import { registerJoinEvents } from "./events/join";
import { registerPartEvents } from "./events/part";
import { commandCache } from "./services/commandCache";
import { loadRegulars } from "./services/accessControl";
import * as streamStatusManager from "./services/streamStatusManager";

export let botStatus = {
  status: "offline" as "offline" | "connecting" | "online",
};

async function main() {
  // Connect to the database
  await prismaConnect();

  // Start API server
  api.listen(api.get("port"), () => {
    consola.ready({
      message: `[API] Listening on http://${api.get("host")}:${api.get("port")}`,
      badge: true,
      timestamp: new Date(),
    });
  });

  api.on("error", (err) => {
    consola.error({
      message: `[API] ${err}`,
      badge: true,
      timestamp: new Date(),
    });
    process.exit(1);
  });

  // Load command cache and regulars from DB
  await commandCache.load();
  await loadRegulars();

  // Create Twitch auth provider (validates/refreshes stored tokens)
  const { authProvider, botUsername } = await createAuthProvider();

  // Build channel list: bot's own channel + the streamer channel
  const channels = [...new Set([botUsername, env.TWITCH_CHANNEL])];

  // Start stream status polling
  const getAccessToken = async () => {
    const cred = await prisma.twitchCredential.findFirst();
    return cred?.accessToken ?? "";
  };
  await streamStatusManager.start(
    env.TWITCH_CHANNEL,
    env.TWITCH_APPLICATION_CLIENT_ID,
    getAccessToken
  );

  // Schedule periodic reload of commands + regulars (every 60s)
  cron.schedule("* * * * *", async () => {
    try {
      await commandCache.reload();
      await loadRegulars();
    } catch (err) {
      consola.warn({
        message: `[Cron] Failed to reload commands/regulars: ${err}`,
        badge: true,
        timestamp: new Date(),
      });
    }
  });

  // Create chat client and register events
  const chatClient = createChatClient(authProvider, botUsername);
  registerConnectionEvents(chatClient, channels);
  registerMessageEvents(chatClient);
  registerJoinEvents(chatClient);
  registerPartEvents(chatClient);

  // Connect to Twitch
  botStatus.status = "connecting";
  chatClient.connect();

  consola.info({
    message: `[Twitch Bot] Joining channels: ${channels.join(", ")}`,
    badge: true,
    timestamp: new Date(),
  });
}

main().catch((err) => {
  consola.error({
    message: `[Twitch Bot] Fatal error: ${err}`,
    badge: true,
    timestamp: new Date(),
  });
  process.exit(1);
});
