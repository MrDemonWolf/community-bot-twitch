const consola = require('consola');

const { info } = require('../../../utils/twitch/commands/log');

const { say } = require('../../../utils/twitch/streamelments');

const uptime = require('./uptime');

module.exports = async (client, channel, tags, message, self) => {
  try {
    const [command, ...args] = message
      .slice(process.env.TWITCH_PREFIX.length)
      .split(/ +/g);

    info(command, tags.username, tags['user-id']);

    switch (args[0]) {
      case 'uptime':
        uptime(client, channel, tags, message, self);
        break;
      default:
        say(
          process.env.STREAMELEMENTS_CHANNEL_ID,
          `@${tags.username}, I'm sorry, but I don't know that command.`
        );
        break;
    }
  } catch (err) {
    consola.error({
      message: `Error in running twitch bot command: ${err}`,
      badge: true,
    });
  }
};
