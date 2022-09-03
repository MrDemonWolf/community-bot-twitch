module.exports = async (client, interaction) => {
  await interaction.reply(`Pong! ${client.ws.ping}ms`);
};
