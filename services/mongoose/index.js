const mongoose = require('mongoose');
const debug = require('debug')('message-app:mongodb');

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
  debug('Mongoose default connection open');
});

// If the connection throws an error
mongoose.connection.on('error', err => {
  debug(`Mongoose default connection error: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  debug('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    debug('Mongoose default connection disconnected through app termination');
    process.exit(0); // eslint-disable-line
  });
});

module.exports = mongoose;
