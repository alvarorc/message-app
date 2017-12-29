/**
 * Module dependencies.
 */
const http = require('http');
const app = require('../app');
const debug = require('debug')('message-app:server');

/**
 * Normalize a port into a number, string, or false.
 * @param {ing} val could be a string or a number
 * @returns {bool} if the port is valid
 */
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Validate if is a type of string
 * @param {*} val
 * @returns {bool}
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Event listener for HTTP server "error" event.
 * @param {Error} error catch any error that express can handle
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = isString(port) ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES': // eslint-disable-next-line no-console
      console.error(`${bind} requires elevated privileges`);
      process.exit(1); // eslint-disable-line
    case 'EADDRINUSE': // eslint-disable-next-line no-console
      console.error(`${bind} is already in use`);
      process.exit(1); // eslint-disable-line
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = isString(addr) ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
