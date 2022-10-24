const consola = require('consola');

const DiscordRules = require('../../../../modals/DiscordRules');
const {
  info,
  success,
  error,
} = require('../../../../utils/discord/commands/log');

module.exports = async (client, interaction) => {
  try {
    info(
      'rules deploy create command',
      interaction.user.username,
      interaction.user.id
    );

    const rule = interaction.options.getString('rule');

    const newRule = new DiscordRules({
      rule,
    });

    await newRule.save();

    await interaction.reply({
      content: `New rule created: ${rule}`,
      ephemeral: true,
    });

    success(
      `rules deploy create command. Rule: ${newRule.id}.`,
      interaction.user.username,
      interaction.user.id
    );
  } catch (err) {
    error(
      'rules deploy create command',
      interaction.user.username,
      interaction.user.id
    );
  }
};
