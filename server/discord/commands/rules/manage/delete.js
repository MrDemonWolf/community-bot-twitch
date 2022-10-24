const consola = require('consola');

const DiscordRule = require('../../../../modals/DiscordRule');
const { info, success } = require('../../../../utils/discord/commands/log');

module.exports = async (client, interaction) => {
  try {
    info(
      'rules deploy delete command',
      interaction.user.username,
      interaction.user.id
    );

    let ruleData = {};

    // discord slash command subcommand option
    const ruleId = interaction.options.getString('ruleid');

    try {
      ruleData = await DiscordRule.findById(ruleId);

      if (!ruleData) {
        consola.error({
          message: `* Rule ${ruleId} does not exist. ${interaction.user.username} (${interaction.user.id})`,
          badge: true,
        });
        return interaction.reply({
          content: `Rule \`${ruleId}\` does not exist.`,
          ephemeral: true,
        });
      }
    } catch (err) {
      consola.error({
        message: `* Error finding rule ${ruleId}: ${err}. ${interaction.user.username} (${interaction.user.id})`,
        badge: true,
      });
      return interaction.reply({
        content: `Rule \`${ruleId}\` does not exist.`,
        ephemeral: true,
      });
    }

    // delete rule
    await ruleData.delete();

    await interaction.reply({
      content: `Rule has been deleted: ${ruleData.rule}`,
      ephemeral: true,
    });

    success(
      `rules deploy delete command. Deleted Rule: ${ruleData.id}.`,
      interaction.user.username,
      interaction.user.id
    );
  } catch (err) {
    consola.error({
      message: `Errorr in running discord deleting rule command: ${err}`,
      badge: true,
    });
  }
};
