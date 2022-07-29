const consola = require('consola');
const mongoose = require('mongoose');

const discordClient = require('./discord');

/**
 * Load environment variables from the .env file, where API keys and passwords are stored.
 */
require('dotenv').config();

const discord = require('./discord');
const discordActivity = require('./discord/activity');

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
  .login(process.env.DISCORD_TOKEN)
  .then(() => {
    consola.success({
      message: 'Discord connected',
      badge: true,
    });
  })
  .catch((err) => {
    consola.error({
      message: `Error logging in: ${err}`,
      badge: true,
    });
  });

/**
 * Cloes connection to mongodb on exit.
 */
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    consola.success(
      'Mongoose connection is disconnected due to application termination'
    );
    process.exit(0);
  });
});
