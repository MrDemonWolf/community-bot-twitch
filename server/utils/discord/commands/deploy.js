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
    .setDescription('Replies with pong!'),
  new SlashCommandBuilder()
    .setName('server')
    .setDescription('Replies with server info!'),
  new SlashCommandBuilder()
    .setName('user')
    .setDescription('Replies with user info!'),
  new SlashCommandBuilder()
    .setName('bot')
    .setDescription('Replies with bot info!'),
  new SlashCommandBuilder()
    .setName('rules')
    .setDescription('Allows admin to add rules to the server')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommandGroup((group) =>
      group
        .setName('manage')
        .setDescription('Allows admin to manage rules')
        .addSubcommand((subcommand) =>
          subcommand
            .setName('create')
            .setDescription('Allows admin to create rules')
            .addStringOption((option) =>
              option
                .setName('rule')
                .setDescription('The rule to create')
                .setRequired(true)
            )
        )
        .addSubcommand((subcommand) =>
          subcommand
            .setName('list')
            .setDescription('Allows admin to list rules with IDs')
        )
        .addSubcommand((subcommand) =>
          subcommand
            .setName('edit')
            .setDescription('Allows admin to edit rules')
            .addStringOption((option) =>
              option
                .setName('ruleid')
                .setDescription('The rule id from list to edit')
                .setRequired(true)
            )
            .addStringOption((option) =>
              option
                .setName('newrule')
                .setDescription('The new rule to replace the old rule')
                .setRequired(true)
            )
        )
        .addSubcommand((subcommand) =>
          subcommand
            .setName('delete')
            .setDescription('Allows admin to delete rules')
            .addStringOption((option) =>
              option
                .setName('ruleid')
                .setDescription('The rule id from list to delete')
                .setRequired(true)
            )
        )
        .addSubcommand((subcommand) =>
          subcommand
            .setName('clear')
            .setDescription('Allows admin to clear all rules')
        )
        .addSubcommand((subcommand) =>
          subcommand
            .setName('publish')
            .setDescription('Allows admin to publish rules to the server')
        )
        .addSubcommand((subcommand) =>
          subcommand
            .setName('unpublish')
            .setDescription('Allows admin to unpublish rules from the server')
        )
    )
    .addSubcommandGroup((group) =>
      group
        .setName('channel')
        .setDescription('Allows admin to set rules channel')
        .addSubcommand((subcommand) =>
          subcommand
            .setName('link')
            .setDescription('Allows admin to link list of rules to the server')
            .addChannelOption((option) =>
              option
                .setName('channel')
                .setDescription('The channel to link the rules to')
                .setRequired(true)
            )
        )
        .addSubcommand((subcommand) =>
          subcommand
            .setName('unlink')
            .setDescription(
              'Allows admin to unlink list of rules from the server'
            )
        )
    ),
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
