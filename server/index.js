const consola = require('consola');
const mongoose = require('mongoose');

const discordClient = require('./discord');
const twitchClient = require('./twitch');

/**
 * Load environment variables from the .env file, where API keys and passwords are stored.
 */
require('dotenv').config();

/**
 * Connect to MongoDB.
 */
mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
});
const db = mongoose.connection;

db.once('open', () => {
  // consola badge for mongoose connection
  consola.success({
    message: 'MongoDB connected',
    badge: true,
  });

  // consola environment type info
  consola.info({
    message: `Environment: ${process.env.NODE_ENV || 'development'}`,
    badge: true,
  });
});

discordClient
  .login(`Bot ${process.env.DISCORD_TOKEN}`)
  .then(() => {
    consola.success({
      message: 'Discord connected',
      badge: true,
    });
  })
  .catch((err) => {
    consola.error({
      message: `Error connecting to Discord: ${err}`,
      badge: true,
    });
  });

/** Connect to Twitch */
twitchClient.connect().then(() => {
  consola
    .success({
      message: 'Twitch connected',
      badge: true,
    })
    .catch((err) => {
      consola.error({
        message: `Error connecting to Twitch: ${err}`,
        badge: true,
      });
    });
});

/**
 * Cloes connection to mongodb on exit.
 */
process.on('SIGINT', async () => {
  // disconnect from discord
  try {
    discordClient.destroy();
    consola.success({
      message: 'Discord disconnected',
      badge: true,
    });
  } catch (err) {
    consola.error({
      message: `Error disconnecting from discord: ${err}`,
      badge: true,
    });
  }

  // disconnect from mongodb

  try {
    await mongoose.disconnect();
    consola.success({
      message: 'MongoDB disconnected',
      badge: true,
    });
  } catch (err) {
    consola.error({
      message: `Error disconnecting from mongodb: ${err}`,
      badge: true,
    });
  }
});
