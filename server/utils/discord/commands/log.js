const consola = require('consola');

function info(message, username, id) {
  consola.info({
    message: `* Executing ${message} from ${username} (${id})`,
    badge: true,
  });
}

function success(message, username, id) {
  consola.success({
    message: `* Successfully executed ${message} from ${username} (${id})`,
    badge: true,
  });
}

function error(message, username, id) {
  consola.error({
    message: `* Error executing ${message} from ${username} (${id})`,
    badge: true,
  });
}

module.exports = {
  success,
  info,
  error,
};
