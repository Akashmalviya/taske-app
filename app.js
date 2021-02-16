const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs')
const swaggerUi = require('swagger-ui-express'),
    YAML = require('yamljs');
require('./db/mongoose')


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const driverRouter = require('./routes/driver');
const vechileRouter = require('./routes/vehicle');
const tripRouter = require('./routes/trip');


const app = express();







// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
require('./middeleware/cros')(app);


/**
 * Swagger API Doc
 */
const swaggerDocument = YAML.load('swagger.yaml');
var options = {
    swaggerOptions: {
        validatorUrl: null
    }
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));


app.use('/', indexRouter);
app.use('/api', usersRouter);
app.use('/driver', driverRouter);
app.use('/trip', tripRouter);
//app.use('/category',vechileRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
