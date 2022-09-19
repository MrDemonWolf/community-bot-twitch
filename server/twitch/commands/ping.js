const consola = require('consola');

module.exports = async (client, channel, tags, message, self) => {
  const [command, ...args] = message;
  consola.info({
    message: `* Executed ${command} command from ${tags.username} (${tags['user-id']})`,
    badge: true,
  });

  client.say(channel, `@${tags.username}, Pong!`);
};
