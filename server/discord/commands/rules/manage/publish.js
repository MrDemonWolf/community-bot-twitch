const consola = require('consola');

const DiscordRules = require('../../../../modals/DiscordRules');
const { info, success } = require('../../../../utils/discord/commands/log');

module.exports = async (client, interaction) => {
  try {
    info(
      'rules manage publish command',
      interaction.user.username,
      interaction.user.id
    );
  } catch (err) {
    consola.error({
      message: `Error in running discord rules manage publish command: ${err}`,
      badge: true,
    });
  }
};
