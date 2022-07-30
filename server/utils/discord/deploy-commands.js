const consola = require('consola');
const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');

/**
 * Load environment variables from the .env file, where API keys and passwords are stored.
 */
require('dotenv').config();

const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong!'),
  // new SlashCommandBuilder()
  //   .setName('info')
  //   .setDescription('Replies with information about the bot.'),
  // new SlashCommandBuilder()
  //   .setName('uptime')
  //   .setDescription('Replies with the uptime of the bot.'),
  // new SlashCommandBuilder()
  //   .setName('help')
  //   .setDescription('Replies with a list of commands.'),
].map((command) => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

rest
  .put(
    Routes.applicationGuildCommands(
      process.env.DISCORD_CLIENT_ID,
      process.env.DISCORD_GUILD_ID
    ),
    { body: commands }
  )
  .then(() => consola.success({ message: 'Discord commands set' }))
  .catch((err) =>
    consola.error({ message: `Error setting discord commands: ${err}` })
  );
