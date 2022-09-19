const ping = require('./ping');

module.exports = async (client, channel, tags, message, self) => {
  const [command, ...args] = message
    .slice(process.env.TWITCH_PREFIX.length)
    .split(/ +/g);

  switch (command) {
    case 'ping':
      ping(client, channel, tags, message, self);
      break;
    default:
      break;
  }
};
