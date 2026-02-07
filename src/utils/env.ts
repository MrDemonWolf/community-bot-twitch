import { z } from "zod";
import dotenv from "dotenv";
import consola from "consola";

dotenv.config();

const envSchema = z.object({
  DATABASE_URL: z
    .string()
    .refine((url) => url.startsWith("postgres"), "Invalid database URL"),
  TWITCH_APPLICATION_CLIENT_ID: z
    .string()
    .min(1, "Twitch Client ID is required"),
  TWITCH_APPLICATION_CLIENT_SECRET: z
    .string()
    .min(1, "Twitch Client Secret is required"),
  INIT_TWITCH_ACCESS_TOKEN: z.string().min(1).optional(),
  INIT_TWITCH_REFRESH_TOKEN: z.string().min(1).optional(),
  TWITCH_CHANNEL: z.string().min(1, "Twitch channel is required"),
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

export const env = parsed.data;
