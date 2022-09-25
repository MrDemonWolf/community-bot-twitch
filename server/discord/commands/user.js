const consola = require('consola');

const { EmbedBuilder } = require('discord.js');

module.exports = async (client, interaction) => {
  try {
    consola.info({
      message: `* Executed user command from ${interaction.user.username} (${interaction.user.id})`,
      badge: true,
    });

    const { guild } = interaction;

    const { username, id, avatar } = interaction.user;

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

    // user roles
    const roles = guild.members.cache
      .get(interaction.user.id)
      .roles.cache.map((role) => role.name)
      .join(', ');

    // user status
    const { status } = interaction.user.presence;

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`${username} Info`)
      .setThumbnail(`https://cdn.discordapp.com/avatars/${id}/${avatar}.png`)
      .addFields(
        {
          name: 'Username',
          value: `<@${id}>`,
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
          name: 'Status',
          value: status.toString(),
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
