/* eslint-disable dot-notation */
const consola = require('consola');
const { EmbedBuilder } = require('discord.js');

const DiscordRules = require('../../../../modals/DiscordRules');

module.exports = async (client, interaction) => {
  try {
    consola.info({
      message: `* Executed rules manage list command from ${interaction.user.username} (${interaction.user.id})`,
      badge: true,
    });

    const rules = await DiscordRules.find({});

    const { name } = interaction.guild;

    const rulesList = rules.map((rule) => ({
      name: rule.id,
      value: rule.rule,
    }));

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`${name} Rules`)
      .addFields(rulesList)
      .setTimestamp()
      .setFooter({
        text: `Requested by ${interaction.user.username}#${interaction.user.discriminator}`,
      });

    if (rulesList.length === 0) {
      embed.setDescription('No rules found.');
    }

    await interaction.reply({ embeds: [embed] });

    consola.success({
      message: `* Successfully executed rules manage list command from ${interaction.user.username} (${interaction.user.id})`,
      badge: true,
    });
  } catch (err) {
    consola.error({
      message: `Error setting discord rules manage list interactions: ${err}`,
      badge: true,
    });
  }
};
