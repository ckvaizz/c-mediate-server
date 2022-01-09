var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
var mongodb = require('./config/mongoConnection')

var managementRouter = require('./routes/management');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin')
mongodb.connect()
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/admin',adminRouter);
app.use('/api/management', managementRouter);
app.use('/api/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404).json({err:'not found'})
  });


// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    console.log(err);
    res.send('error');
  });

module.exports = app;
