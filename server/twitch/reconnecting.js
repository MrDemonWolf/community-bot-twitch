const consola = require('consola');
module.exports = async () => {
  try {
    consola.info({
      message: 'Reconnecting to Twitch...',
      badge: true,
    });
  }
  catch (err) {
    consola.error({
      message: `Error reconnecting to Twitch: ${err}`,
      badge: true,
    });
  }
