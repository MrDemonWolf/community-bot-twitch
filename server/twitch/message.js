const commands = require('./commands');

module.exports = async (client, channel, tags, message, self) => {
  // Ignore echoed messages.
  if (self) return;

  // Ignore messages not starting with the prefix.
  if (message.indexOf(process.env.TWITCH_PREFIX) !== 0) return;

  // ingore whispers
  if (tags['message-type'] === 'whisper') return;

  // pass the message to the commands handler
  await commands(client, channel, tags, message, self);
};
