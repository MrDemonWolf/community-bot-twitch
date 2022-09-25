const consola = require('consola');

const { EmbedBuilder, discordSort } = require('discord.js');

module.exports = async (client, interaction) => {
  try {
    consola.info({
      message: `* Executed info command from ${interaction.user.username} (${interaction.user.id})`,
      badge: true,
    });

    const { guild } = interaction;

    const { username, id, avatar } = client.user;

    const totalMembers = guild.members.cache.size;

    const totalBots = guild.members.cache.filter(
      (member) => member.user.bot
    ).size;

    const totalHumans = totalMembers - totalBots;

    const totalChannels = guild.channels.cache.size;

    const totalTextChannels = guild.channels.cache.filter(
      (channel) => channel.type === 'GUILD_TEXT'
    ).size;

    const totalVoiceChannels = guild.channels.cache.filter(
      (channel) => channel.type === 'GUILD_VOICE'
    ).size;

    const totalCategories = guild.channels.cache.filter(
      (channel) => channel.type === 'GUILD_CATEGORY'
    ).size;

    const totalRoles = guild.roles.cache.size;

    // uptime in discord fancy format
    const style = 'R';
    const uptime = `<t:${Math.floor(client.readyAt / 1000)}${
      style ? `:${style}` : ''
    }>`;

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`${username} Info`)
      .setDescription(
        'A simple community bot for MrDemonWolf, Inc Discord Server and Twitch Community Chat'
      )
      // set the thumbnail of the embed to bot avatar
      .setThumbnail(
        `https://cdn.discordapp.com/avatars/${id}/${avatar}.png?size=256`
      )
      .setTimestamp()
      .addFields(
        {
          name: 'Uptime',
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
        }
      )
      .setFooter({
        text: `Requested by ${interaction.user.username}#${interaction.user.discriminator}`,
      });

    // repoly to interaction channel

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
