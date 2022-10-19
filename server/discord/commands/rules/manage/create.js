const consola = require('consola');

const DiscordRules = require('../../../../modals/DiscordRules');

module.exports = async (client, interaction) => {
  try {
    consola.info({
      message: `* Executed rules manage create command from ${interaction.user.username} (${interaction.user.id})`,
      badge: true,
    });
    const rule = interaction.options.getString('rule');

    const newRule = new DiscordRules({
      rule,
    });

    await newRule.save();

    await interaction.reply({
      content: `New rule created: ${rule}`,
      ephemeral: true,
    });

    consola.success({
      message: `* Create new rule: ${rule} received from ${interaction.user.username} (${interaction.user.id})`,
    });

    consola.success({
      message: `* Successfully executed rules manage create command from ${interaction.user.username} (${interaction.user.id})`,
      badge: true,
    });
  } catch (err) {
    consola.error({
      message: `Error setting discord rules manage create interactions: ${err}`,
      badge: true,
    });
  }
};
