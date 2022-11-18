const consola = require('consola');

function info(command, username, id) {
  consola.info({
    message: `* Executed ${command} command from ${username} (${id})`,
    badge: true,
  });
}

module.exports = {
  info,
};
