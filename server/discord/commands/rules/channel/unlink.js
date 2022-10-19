const consola = require('consola');

const DiscordGuild = require('../../../../modals/DiscordGuild');

module.exports = async (client, interaction) => {
  try {
    consola.info({
      message: `* Executed rules deploy unlink command from ${interaction.user.username} (${interaction.user.id})`,
      badge: true,
    });

    const manageId = await DiscordGuild.findOne({
      guildId: interaction.guild.id,
      rules: {
        messageId: {
          $exists: true,
        },
      },
    });

    if (!manageId) {
      const message = await interaction.guild.channels.cache
        .get(manageId.rules.channelId)
        .messages.fetch(manageId.rules.messageId);

      await message.delete();
    }

    await DiscordGuild.findOneAndUpdate(
      {
        guildId: interaction.guild.id,
      },
      {
        rules: null,
      },
      {
        upsert: true,
      }
    );

    await interaction.reply({
      content: `Rules successfully unlinked.`,
      ephemeral: true,
    });

    consola.success({
      message: `* Successfully unlinked rules to received from ${interaction.user.username} (${interaction.user.id})`,
    });

    consola.success({
      message: `* Successfully executed rules deploy unlink command from ${interaction.user.username} (${interaction.user.id})`,
      badge: true,
    });
  } catch (err) {
    consola.error({
      message: `Error setting discord rules deploy liunlinknk interactions: ${err}`,
      badge: true,
    });
  }
};
