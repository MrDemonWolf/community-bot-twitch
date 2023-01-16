const consola = require('consola');
const bot = require('./bot');
const status = require('./status');

module.exports = async (client, channel, tags, message, self) => {
  const [command, ...args] = message
    .slice(process.env.TWITCH_PREFIX.length)
    .split(/ +/g);

  switch (command) {
    case 'bot':
      bot(client, channel, tags, message, self);
      break;

    default:
      break;
  }
};
