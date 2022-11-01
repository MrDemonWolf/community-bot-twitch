const consola = require('consola');

module.exports = async (reason) => {
  try {
    consola.info({
      message: `Disconnected from Twitch: ${reason}`,
      badge: true,
    });
  } catch (err) {
    consola.error({
      message: `Error disconnect twitch bot: ${err}`,
      badge: true,
    });
  }
};
