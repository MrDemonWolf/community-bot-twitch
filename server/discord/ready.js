const consola = require('consola');

const activity = require('./activity');
const commands = require('./commands');

module.exports = async (client) => {
  try {
    // set activity
    activity(client);

    // set commands
    commands(client);

    consola.success({
      message: `Logged in as ${client.user.tag}`,
      badge: true,
    });
  } catch (err) {
    consola.error({
      message: err,
      badge: true,
    });
  }
};
