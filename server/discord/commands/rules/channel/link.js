const consola = require('consola');

const DiscordGuild = require('../../../../modals/DiscordGuild');

module.exports = async (client, interaction) => {
  try {
    consola.info({
      message: `* Executed rules deploy link command from ${interaction.user.username} (${interaction.user.id})`,
      badge: true,
    });

    const channelId = interaction.options.getChannel('channel').id;

    await DiscordGuild.findOneAndUpdate(
      {
        guildId: interaction.guild.id,
      },
      {
        rules: {
          channelId,
        },
      },
      {
        upsert: true,
      }
    );

    await interaction.reply({
      content: `Rules successfully linked to <#${channelId}>`,
      ephemeral: true,
    });

    consola.success({
      message: `* Successfully linked rules to <#${channelId}> received from ${interaction.user.username} (${interaction.user.id})`,
    });

    consola.success({
      message: `* Successfully executed rules deploy link command from ${interaction.user.username} (${interaction.user.id})`,
      badge: true,
    });
  } catch (err) {
    consola.error({
      message: `Error setting discord rules deploy link interactions: ${err}`,
      badge: true,
    });
  }
};
