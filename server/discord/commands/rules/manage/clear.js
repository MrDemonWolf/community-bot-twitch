const consola = require('consola');

const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const DiscordRules = require('../../../../modals/DiscordRules');

module.exports = async (client, interaction) => {
  try {
    consola.info({
      message: `* Executed rules manage clear command from ${interaction.user.username} (${interaction.user.id})`,
      badge: true,
    });

    const rules = await DiscordRules.find({});

    if (rules.length === 0) {
      return await interaction.reply({
        content: 'There are no rules to clear.',
        ephemeral: true,
      });
    }

    const cancelButton = new ButtonBuilder()
      .setCustomId('cancel')
      .setLabel('Cancel')
      .setStyle(ButtonStyle.Primary);

    const confirmButton = new ButtonBuilder()
      .setCustomId('confirm')
      .setLabel('Confirm')
      .setStyle(ButtonStyle.Danger);

    const row = new ActionRowBuilder().addComponents(
      cancelButton,
      confirmButton
    );

    await interaction.reply({
      content: 'Are you sure you want to clear all rules?',
      components: [row],
      ephemeral: true,
    });

    const filter = (i) => i.user.id === interaction.user.id;

    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      time: 15000,
    });

    collector.on('collect', async (i) => {
      if (i.customId === 'cancel') {
        await i.update({
          content: 'Clear rules cancelled.',
          components: [],
        });
        consola.success({
          message: `* Clear rules cancelled received from ${interaction.user.username} (${interaction.user.id})`,
        });
      }

      if (i.customId === 'confirm') {
        await DiscordRules.deleteMany({
          guildId: interaction.guild.id,
        });

        await i.update({
          content: 'All rules have been cleared.',
          components: [],
        });

        consola.success({
          message: `* Rules cleared received from ${interaction.user.username} (${interaction.user.id})`,
        });
      }
    });

    collector.on('end', async (collected) => {
      if (collected.size === 0) {
        await interaction.reply({
          content: 'Clear rules cancelled.',
          ephemeral: true,
        });
        consola.success({
          message: `* Clear rules cancelled received from ${interaction.user.username} (${interaction.user.id})`,
        });
      }
    });

    consola.success({
      message: `* Successfully executed rules manage clear command from ${interaction.user.username} (${interaction.user.id})`,
      badge: true,
    });
  } catch (err) {
    consola.error({
      message: `Error setting discord rules manage clear interactions: ${err}`,
      badge: true,
    });
  }
};
