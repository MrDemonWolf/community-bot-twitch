const consola = require('consola');
const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');

/**
 * Load environment variables from the .env file, where API keys and passwords are stored.
 */
require('dotenv').config();

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

rest
  .put(
    Routes.applicationGuildCommands(
      process.env.DISCORD_CLIENT_ID,
      process.env.DISCORD_GUILD_ID
    ),
    { body: [] }
  )
  .then(() => consola.success({ message: 'Discord commands all cleared' }))
  .catch((err) =>
    consola.error({ message: `Error clearing discord commands: ${err}` })
  );
