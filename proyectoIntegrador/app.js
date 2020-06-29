var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
//Este es para inicio de sesion

//TODO el require te dice que va devolver un objeto literal por lo que es importante guardarlo dentro de una variable para poder acceder a sus propiedades y funcionalidades.
//? Existen tres modulos: nativos, de terceros y creados por uno. El ultimo, se debe exportar mediante un objeto nativo llamdao 'modulo' y su propiedad 'exports'

//! Esto es para la cookie
var recordameMiddleware = require('./middlewares/recordameMiddleware');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const info_serie_router = require('./routes/info_serie');
const generos_router = require('./routes/generos');
const avanzado_router = require('./routes/avanzado');
//const favoritos_router = require('./routes/favoritos'); Esta vista no existe o fue eliminada
const resultados_router = require('./routes/resultados');
const series_xgenero_router = require('./routes/series_xgenero');
const resenias_router = require('./routes/resenias');
const reseniasXuser_router = require('./routes/reseniasXuser');

//Esto esta importando el objeto router situado en esas direcciones

var app = express();
//! Express es un framework que optimiza y facilita el desarrollo de apps web en Node Js
// view engine setup
app.set('views', path.join(__dirname, 'views'));
//! Al utilizar los objetos estaticos no hace falta completar toda la ruta se pone solo: /stylesheets...
app.set('view engine', 'ejs');
// Nuestro entorno de trabajo, nuestro motor de plantillas se llama ejs. Permite generar estructuras dinamicas y reutilizar el codigo
// Los motores de vistasz definen bloques de codigos que se pueden rellenar con datos variables
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
//! El app.use posee dos parametros, el primero es la solicitud del recurso y el segundo establece que sera atendida por el modulo -----Router y su logica detras
//TODO Un modulo es un bloque de codigo reutilizable, unidad de funcionalidad.
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
