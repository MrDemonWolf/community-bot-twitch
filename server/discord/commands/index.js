const consola = require('consola');

/**
 * Load commands from the ./commands directory.
 */
const ping = require('./ping');

module.exports = (client) => {
  try {
    client.on('interactionCreate', async (interaction) => {
      if (!interaction.isChatInputCommand()) return;

      const { commandName } = interaction;

      switch (commandName) {
        case 'ping':
          await ping(client, interaction);
          break;
        default:
          consola.warn({
            message: `Unknown command: ${commandName}`,
            badge: true,
          });
      }
    });
    consola.success({
      message: 'Discord commands initialized',
      badge: true,
    });
  } catch (err) {
    consola.error({
      message: `Error setting discord commands interactions: ${err}`,
      badge: true,
    });
  }
};
