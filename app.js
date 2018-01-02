const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const mongoose = require('./services/mongoose');
const api = require('./api');
const healthCheck = require('./services/utils/healthCheck');

const app = express();

/**
 * Connect to db
 */
const isDevelopment = process.env.NODE_ENV === 'development';
const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost/message-app';

mongoose.Promise = global.Promise;
mongoose.set('debug', isDevelopment);
// connect to mongodb
mongoose.connect(DB_URI);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);

app.use(
  '/healthcheck',
  healthCheck()
);

// not found route handler
app.get('*', (req, res, next) => {
  setImmediate(() => next(new Error('Not Found')));
});

// development error handler
// will print stacktrace
if (isDevelopment) {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
