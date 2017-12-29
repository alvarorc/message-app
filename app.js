const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const mongoose = require('./services/mongoose');

// to remove
const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

/**
 * Connect to db
 */
const isDeveloper = process.env.NODE_ENV === 'development';
const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost/message-app';

mongoose.connect(DB_URI);
mongoose.Promise = global.Promise;
mongoose.set('debug', isDeveloper);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// development error handler
// will print stacktrace
if (isDeveloper) {
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
