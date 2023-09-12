const { Client, GatewayIntentBits } = require('discord.js');

const ready = require('./ready');
const guildCreate = require('./guildCreate');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// discord on ready
client.on('ready', async () => ready(client));

// discord on guild create
client.on('guildCreate', async (guild) => guildCreate(client, guild));

module.exports = client;
