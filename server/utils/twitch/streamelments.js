const axios = require('axios');

/**
 * Export say function
 */
module.exports.say = async (channelId, message) => {
  try {
    axios.post(
      `https://api.streamelements.com/kappa/v2/bot/${channelId}/say`,
      {
        message: message,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.STREAMELMENTS_API_KEY}`,
          Accept: 'application/json',
        },
      }
    );
  } catch (error) {
    console.log(error.body);
    consola.error({
      message: `Error in running streamelments api to bot say: ${error}`,
      badge: true,
    });
  }
};
