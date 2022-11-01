const tmi = require('tmi.js');
const pb = require('@madelsberger/pausebuffer');

const message = require('./message');

/**
 * Load environment variables from the .env file, where API keys and passwords are stored.
 */
require('dotenv').config();

const options = {
  options: {
    debug: false,
  },
  connection: {
    reconnect: true,
  },
  identity: {
    username: process.env.TWITCH_BOT_USERNAME,
    password: process.env.TWITCH_BOT_OAUTH_TOKEN,
  },
  channels: [process.env.TWITCH_CHANNEL_NAME],
};

const client = pb.wrap(new tmi.Client(options));

// pass commands to the client that is listening for them
client.on('message', async (channel, tags, message, self) => {
  await message(client, channel, tags, message, self);
});

client.on('disconnected', (reason) => {
  console.log(`Disconnected from Twitch: ${reason}`);
});

module.exports = client;
