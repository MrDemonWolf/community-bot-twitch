const consola = require('consola');
const { Client, GatewayIntentBits } = require('discord.js');

const activity = require('./activity');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// discord on ready
client.on('ready', () => {
  activity(client);
});

module.exports = client;
