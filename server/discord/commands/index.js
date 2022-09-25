const consola = require('consola');

const ping = require('./ping');
const bot = require('./bot');
const server = require('./server');
const user = require('./user');

module.exports = (client) => {
  try {
    client.on('interactionCreate', async (interaction) => {
      if (!interaction.isChatInputCommand()) return;

      const { commandName } = interaction;

      switch (commandName) {
        case 'ping':
          await ping(client, interaction);
          break;
        case 'server':
          await server(client, interaction);
          break;
        case 'user':
          await user(client, interaction);
          break;
        case 'bot':
          await bot(client, interaction);
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
