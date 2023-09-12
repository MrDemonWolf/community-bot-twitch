const consola = require('consola');
const dayjs = require('dayjs');

const { EmbedBuilder } = require('discord.js');

const DiscordGuild = require('../../../modals/DiscordGuild');
const DiscordRule = require('../../../modals/DiscordRule');

module.exports = async (guild) => {
  try {
    const { name, id } = guild;

    consola.info({
      message: `Updating discord guild rules for ${name} with the id of ${id}`,
      badge: true,
    });

    const discordGuild = await DiscordGuild.findOne({
      guildId: guild.id,
    });

    if (!discordGuild) {
      consola.error({
        message: `No guild found for discord guild  ${name} with the id of ${id}`,
        badge: true,
      });
      return;
    }

    const rulesChannel = guild.channels.cache.get(discordGuild.rules.channelId);

    if (!rulesChannel) {
      consola.error({
        message: `No rules channel found for discord guild  ${name} with the id of ${id}`,
        badge: true,
      });
      return;
    }

    // find message in rules channel
    const rulesMessage = await rulesChannel.messages.fetch(
      discordGuild.rules.messageId
    );

    if (!rulesMessage) {
      consola.error({
        message: `No rules message found for discord guild ${name} with the id of ${id}`,
        badge: true,
      });
      return;
    }

    const rules = await DiscordRule.find({
      guildId: id,
    });

    const rulesList = rules.map((rule, index) => `${index + 1}. ${rule.rule}`);

    // convert lastUpdatedTimestamp to discord fancy format
    const lastUpdated = `<t:${dayjs(discordGuild.rules.updatedAt).unix()}:F>`;

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`${name} Rules`)
      .setDescription(rulesList.join('\n'))
      .setTimestamp()
      .setFooter({
        text: `Last updated ${lastUpdated}`,
      });

    if (rules.length === 0) {
      embed.setDescription('No rules found. Please add some first.');
    }

    await rulesMessage.edit({ embeds: [embed] });

    consola.success({
      message: `Updated rules for discord guild ${name} with the id of ${id}`,
      badge: true,
    });
  } catch (err) {
    console.log(err);
    consola.error({
      message: `Error updating discord guild rules with the id of ${guild.id}: ${err}`,
      badge: true,
    });
  }
};
