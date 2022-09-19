const tmi = require('tmi.js');
const pb = require('@madelsberger/pausebuffer');

const commands = require('./commands');

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
  // Ignore echoed messages.
  if (self) return;

  // Ignore messages not starting with the prefix.
  if (message.indexOf(process.env.TWITCH_PREFIX) !== 0) return;

  // ingore whispers
  if (tags['message-type'] === 'whisper') return;

  // pass the message to the commands handler
  await commands(client, channel, tags, message, self);
});

module.exports = client;
