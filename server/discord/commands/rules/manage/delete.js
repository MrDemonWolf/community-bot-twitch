const consola = require('consola');

const DiscordRules = require('../../../../modals/DiscordRules');

module.exports = async (client, interaction) => {
  try {
    consola.info({
      message: `* Executed rules manage remove command from ${interaction.user.username} (${interaction.user.id})`,
      badge: true,
    });

    let ruleData = {};

    // discord slash command subcommand option
    const ruleId = interaction.options.getString('ruleid');

    try {
      ruleData = await DiscordRules.findById(ruleId);

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

    consola.success({
      message: `* Rule deleted: ${ruleData.rule} received from ${interaction.user.username} (${interaction.user.id})`,
    });

    consola.success({
      message: `* Successfully executed rules manage delete command from ${interaction.user.username} (${interaction.user.id})`,
      badge: true,
    });
  } catch (err) {
    consola.error({
      message: `Error setting discord rules manage addelete interactions: ${err}`,
      badge: true,
    });
  }
};
