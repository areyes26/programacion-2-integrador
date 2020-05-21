var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const info_serie_router = require('./routes/info_serie');
const generos_router = require('./routes/generos');
const avanzado_router = require('./routes/avanzado');
const favoritos_router = require('./routes/favoritos');
const resultados_router = require('./routes/resultados');
const series_xgenero_router = require('./routes/series_xgenero');
const resenias_router = require('./routes/resenias');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/info_serie', info_serie_router);
app.use('/generos', generos_router);
app.use('/avanzado', avanzado_router);
app.use('/favoritos', favoritos_router);
app.use('/resultados', resultados_router);
app.use('/series_xgenero', series_xgenero_router);
app.use('/resenias', resenias_router);
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
