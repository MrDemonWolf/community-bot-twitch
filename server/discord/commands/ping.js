const consola = require('consola');

module.exports = async (client, interaction) => {
  consola.info({
    message: `* Executed ping command from ${interaction.user.username} (${interaction.user.id})`,
    badge: true,
  });

  await interaction.reply(`Pong! ${client.ws.ping}ms`);
};
