const consola = require('consola');
const {
  SlashCommandBuilder,
  Routes,
  PermissionFlagsBits,
} = require('discord.js');

const { REST } = require('@discordjs/rest');

/**
 * Load environment variables from the .env file, where API keys and passwords are stored.
 */
require('dotenv').config();

const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong!')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
].map((command) => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

rest
  .put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), {
    body: commands,
  })
  .then(() => consola.success({ message: 'Discord conmmands set' }))
  .catch((err) =>
    consola.error({ message: `Error setting discord commands: ${err}` })
  );
