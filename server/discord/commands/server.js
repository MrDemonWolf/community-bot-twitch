const consola = require('consola');

const { EmbedBuilder } = require('discord.js');

module.exports = async (client, interaction) => {
  try {
    consola.info({
      message: `* Executed server command from ${interaction.user.username} (${interaction.user.id})`,
      badge: true,
    });

    const { guild } = interaction;

    const { name, icon, id, description, ownerId } = guild;

    // convert discord snowflake to date
    const createdAt = new Date(parseInt(id, 10) / 4194304 + 1420070400000);

    // convert date to discord fancy format
    const style = 'R';
    const createdAtFormatted = `<t:${Math.floor(createdAt / 1000)}${
      style ? `:${style}` : ''
    }>`;

    // uptime in discord fancy format
    const uptime = `<t:${Math.floor(client.readyAt / 1000)}${
      style ? `:${style}` : ''
    }>`;

    // total members in server
    const totalMembers = guild.members.cache.size;

    // total bots in server
    const totalBots = guild.members.cache.filter(
      (member) => member.user.bot
    ).size;

    // total humans in server
    const totalHumans = totalMembers - totalBots;

    // total channels in server
    const totalChannels = guild.channels.cache.size;

    // total text channels in server
    const totalTextChannels = guild.channels.cache.filter(
      (channel) => channel.type === 'GUILD_TEXT'
    ).size;

    // total voice channels in server
    const totalVoiceChannels = guild.channels.cache.filter(
      (channel) => channel.type === 'GUILD_VOICE'
    ).size;

    // total categories in server
    const totalCategories = guild.channels.cache.filter(
      (channel) => channel.type === 'GUILD_CATEGORY'
    ).size;

    // total roles in server
    const totalRoles = guild.roles.cache.size;

    // total emojis in server
    const totalEmojis = guild.emojis.cache.size;

    // total boosts in server
    const totalBoosts = guild.premiumSubscriptionCount;

    // total boosters in server
    const totalBoosters = guild.premiumSubscriptionCount;

    // total boost tier in server
    const totalBoostTier = guild.premiumTier;

    // list of roles in server
    const roles = guild.roles.cache
      .sort()
      .map((role) => role.toString())
      .join(', ');

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`${name} Info`)
      .setDescription(description)
      // set the thumbnail of the embed to server icon
      .setThumbnail(
        `https://cdn.discordapp.com/icons/${id}/${icon}.png?size=256`
      )
      .addFields(
        {
          name: 'Owner',
          value: `<@${ownerId}>`,
          inline: true,
        },
        {
          name: 'Created At',
          value: createdAtFormatted.toString(),
          inline: true,
        },
        {
          name: 'Bot Uptime',
          value: uptime.toString(),
          inline: true,
        },
        {
          name: 'Total Members',
          value: totalMembers.toString(),
          inline: true,
        },
        {
          name: 'Total Bots',
          value: totalBots.toString(),
          inline: true,
        },
        {
          name: 'Total Humans',
          value: totalHumans.toString(),
          inline: true,
        },
        {
          name: 'Total Channels',
          value: totalChannels.toString(),
          inline: true,
        },
        {
          name: 'Total Text Channels',
          value: totalTextChannels.toString(),
          inline: true,
        },
        {
          name: 'Total Voice Channels',
          value: totalVoiceChannels.toString(),
          inline: true,
        },
        {
          name: 'Total Categories',
          value: totalCategories.toString(),
          inline: true,
        },
        {
          name: 'Total Roles',
          value: totalRoles.toString(),
          inline: true,
        },
        {
          name: 'Total Emojis',
          value: totalEmojis.toString(),
          inline: true,
        },
        {
          name: 'Total Boosts',
          value: totalBoosts.toString(),
          inline: true,
        },
        {
          name: 'Total Boosters',
          value: totalBoosters.toString(),
          inline: true,
        },
        {
          name: 'Total Boost Tier',
          value: totalBoostTier.toString(),
          inline: true,
        },
        {
          name: 'Roles',
          value: roles.toString(),
          inline: false,
        }
      )
      .setTimestamp()
      .setFooter({
        text: `Requested by ${interaction.user.username}#${interaction.user.discriminator}`,
      });

    await interaction.reply({
      embeds: [embed],
    });
  } catch (err) {
    console.error(err);
    consola.error({
      message: `Error executing info command: ${err}`,
      badge: true,
    });
  }
};
