const consola = require('consola');

const manage = require('./manage');

module.exports = async (client, interaction) => {
  try {
    const getSubcommandGroup = interaction.options.getSubcommandGroup();

    switch (getSubcommandGroup) {
      case 'manage':
        await manage(client, interaction);
        break;
      default:
        consola.error({
          message: `Unknown subcommand group: ${getSubcommandGroup}`,
          badge: true,
        });
    }
  } catch (err) {
    consola.error({
      message: `Error setting discord rules interactions: ${err}`,
      badge: true,
    });
  }
};
