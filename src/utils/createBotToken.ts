import { z } from "zod";
import dotenv from "dotenv";
import consola from "consola";

import axios from "axios";
import { URLSearchParams } from "url";

/**
 * Load environment variables from .env file and validate them.
 */
dotenv.config();

const envSchema = z.object({
  TWITCH_APPLIICATION_CLIENT_ID: z.string(),
  TWITCH_APPLIICATION_CLIENT_SERECT: z.string(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  consola.error({
    message: "Invalid environment variables found",
    additional: JSON.stringify(parsed.error.format(), null, 4),
    badge: true,
    timestamp: new Date(),
  });
  process.exit(1);
}

const env = parsed.data;

async function getTwitchFullScopeBotToken() {
  try {
    // Construct the URL for the OAuth token request
    const url = "https://id.twitch.tv/oauth2/token";

    // Request payload to get OAuth token with the required scopes
    const params = new URLSearchParams();
    params.append("client_id", env.TWITCH_APPLIICATION_CLIENT_ID);
    params.append("client_secret", env.TWITCH_APPLIICATION_CLIENT_SERECT);
    params.append("grant_type", "client_credentials");

    // Sending the request to Twitch API
    const response = await axios.post(url, params);

    if (response.status === 200) {
      const accessToken = response.data.access_token;
      consola.success({
        message: `Successfully got the bot token ${accessToken}`,
        badge: true,
        timestamp: new Date(),
      });
    } else {
      consola.error({
        message: `Failed to get the bot token: ${response}`,
        badge: true,
        timestamp: new Date(),
      });
    }
  } catch (err: any) {
    consola.error({
      message: `Failed to get the bot token: ${err}`,
      badge: true,
      timestamp: new Date(),
    });
  }
}

getTwitchFullScopeBotToken();
