import { env } from "./utils/env";
import { prismaConnect } from "./database";

/**
 * Import Environment variables
 */
const TWITCH_APPLIICATION_TOKEN = env.TWITCH_APPLIICATION_TOKEN;

/**
 * Connect to the database
 */
prismaConnect();
