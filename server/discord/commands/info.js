const { EmbedBuilder } = require('discord.js');

module.exports = async (client, interaction) => {
  // shows bot uptime and guild count and user count and guild description and guild title
  const { guild } = interaction;
  console.log(guild);
  const { name, description, memberCount, channels, roles, ownerID } = guild;

  // gget user details from finding them ion a guiild by user id
  const owner = guild.members.cache.get(ownerID);

  console.log(ownerID);

  // const { username, discriminator } = owner;
  const { id } = interaction.author;
  const { uptime } = client.uptime;
  const { version } = client.version;
  const { userCount } = client.guilds.cache;
  const { user } = client.users.cache.get(id);
  const { createdAt } = user;
  const { presence } = user;

  const embed = new EmbedBuilder()
    .setColor('#0099ff')
    .setTitle(name)
    .setDescription(description)
    .setThumbnail(
      `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
    )
    .setTimestamp()
    .setFooter(
      `${username}#${discriminator}`,
      `https://cdn.discordapp.com/avatars/${id}/${user.avatar}.png`
    )
    .addField('Owner', `${owner.username}#${owner.discriminator}`, true)
    .addField('Member Count', memberCount, true)
    .addField('Channel Count', channels.size, true)
    .addField('Role Count', roles.size, true)
    .addField('Uptime', uptime, true)
    .addField('Version', version, true)
    .addField('User Count', userCount, true)
    .addField('Created At', createdAt, true);

  await interaction.reply({ embeds: [embed] });
};
