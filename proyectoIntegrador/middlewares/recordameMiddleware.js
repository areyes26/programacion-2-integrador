//! Un Middleware es como un controlador
let modulo = require('../modulo-login');

function recordameMiddleware(req, res, next) {
	next();
	if ((req.cookies.recordame != undefined) & (req.session.usuarioLogeado == undefined)) {
		//TODO acordarse que el undefined inidcia que el checkbox esta checkeado!! Si hay cookies pero todavia no se abrio la sesion
		modulo.buscarPorEmail(req.cookies.recordame).then((resultado) => {
			console.log(resultado);
			//! Si existe el usuario, esto me lleva al login general
			req.session.usuarioLogeado = resultado.email;
			//? El req.session ahora guarda el email de la cookie como "usuarioLogeado"
		});
	}
}

module.exports = recordameMiddleware;
