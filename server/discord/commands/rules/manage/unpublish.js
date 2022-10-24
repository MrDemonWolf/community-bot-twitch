const consola = require('consola');

const DiscordGuild = require('../../../../modals/DiscordGuild');

const { info, success } = require('../../../../utils/discord/commands/log');

module.exports = async (client, interaction) => {
  try {
    info(
      'rules manage unpublish command',
      interaction.user.username,
      interaction.user.id
    );

    const { guild } = interaction;

    const discordGuild = await DiscordGuild.findOne({
      guildId: guild.id,
      'rules.channelId': { $exists: true },
    });

    if (!discordGuild) {
      await interaction.reply({
        content:
          'No rules channel found. Please set one first before unpublish.',
        ephemeral: true,
      });
      return;
    }

    const rulesChannel = guild.channels.cache.get(discordGuild.rules.channelId);

    await message.delete();

    await interaction.reply({
      content: 'Rules unpublished.',
      ephemeral: true,
    });

    success(
      'rules manage unpublish command',
      interaction.user.username,
      interaction.user.id
    );
  } catch (err) {
    consola.error({
      message: `Error in running discord rules manage unpublish command: ${err}`,
      badge: true,
    });
  }
};
