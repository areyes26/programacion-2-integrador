var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
//Este es para inicio de sesion

//! Esto es para la cookie
var recordameMiddleware = require('./middlewares/recordameMiddleware');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const info_serie_router = require('./routes/info_serie');
const generos_router = require('./routes/generos');
const avanzado_router = require('./routes/avanzado');
const favoritos_router = require('./routes/favoritos');
const resultados_router = require('./routes/resultados');
const series_xgenero_router = require('./routes/series_xgenero');
const resenias_router = require('./routes/resenias');
const reseniasXuser_router = require('./routes/reseniasXuser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'usuario' }));
//? El secret es solo para esta app

app.use(function (req, res, next) {
	let locals = {};
	if (req.session.erroresregistracion) {
		// Comparta los mismos errores de registracion para todas las vistas
		locals.erroresregistracion = req.session.erroresregistracion;
	}
	req.session.erroresregistracion = undefined;

	locals.erroreslogin = req.session.erroreslogin;

	req.session.erroreslogin = undefined;

	locals.erroresreseñas = req.session.erroresreseñas;

	req.session.erroresreseñas = undefined;
	//! Res.locals: objeto que se envia a traves de toda tu aplicacion. Son 'globales' al renderizar.
	locals.usuarioLogeado = req.session.usuarioLogeado;
	//todo en la linea de arriba se esta compartiendo el email del usuario capturado
	//todo con toda la aplicacioon
	res.locals = locals;
	next();
});

//!Esto es para el login

app.use(recordameMiddleware);
//? Se cruza con toda la aplicacion el recordame

//?Comienza el sistema de Ruteo
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/info_serie', info_serie_router);
app.use('/generos', generos_router);
app.use('/avanzado', avanzado_router);

//TODO voy a comentar /favoritos porque no se agrego
//app.use('/favoritos', favoritos_router);

app.use('/resultados', resultados_router);
app.use('/series_xgenero', series_xgenero_router);
app.use('/resenias', resenias_router);
app.use('/reseniasXuser', reseniasXuser_router);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
