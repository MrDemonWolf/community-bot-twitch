/* eslint-disable dot-notation */
const consola = require('consola');
const { EmbedBuilder } = require('discord.js');

const DiscordRules = require('../../../../modals/DiscordRules');
const {
  info,
  success,
  error,
} = require('../../../../utils/discord/commands/log');

module.exports = async (client, interaction) => {
  try {
    info(
      'rules deploy list command',
      interaction.user.username,
      interaction.user.id
    );

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

    success(
      'rules deploy list command',
      interaction.user.username,
      interaction.user.id
    );
  } catch (err) {
    error(
      'rules deploy list command',
      interaction.user.username,
      interaction.user.id
    );
  }
};