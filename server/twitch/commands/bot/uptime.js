const dayjs = require('dayjs');
const duration = require('dayjs/plugin/duration');

/**
 * dayjs import duration plugin
 */
dayjs.extend(duration);

const { say } = require('../../../utils/twitch/streamelments');

module.exports = async (client, channel, tags, message, self) => {
  say(
    process.env.STREAMELEMENTS_CHANNEL_ID,
    `@${tags.username}, I've been online for ${dayjs.duration(
      process.uptime() * 1000
    ).format(`
      ${client.uptime > 86400000 ? 'D [days]' : ''}
      ${client.uptime > 3600000 ? 'H [hours]' : ''}
      m [minutes] s [seconds]`)}`
  );
};
