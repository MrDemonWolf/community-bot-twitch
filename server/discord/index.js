const { Client, GatewayIntentBits } = require('discord.js');

const activity = require('./activity');
const commands = require('./commands');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// discord on ready
client.on('ready', () => {
  activity(client);
  commands(client);
});

module.exports = client;
