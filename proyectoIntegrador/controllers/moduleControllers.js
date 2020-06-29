let db = require('../database/models');
let sequelize = db.sequelize;
let modulo = require('../modulo-login');
let bycrypt = require('bcryptjs');

let moduleControllers = {
	lista: function (req, res) {
		//TODO esta funcion permite ponerle las resenas adecuadas para cada serie
		// El req.query.id captura los parametros del url despues del ? del URL, captura el querystring (cadena de texto que viaja en la url)
		//? Mientras que el req.params contiene parametros que proviene de las rutas (:movie_id)
		sequelize.query('SELECT*FROM resenas JOIN users ON users.user_id = resenas.user_id where movie_id =' + req.query.id).then(function (resultados) {
			let todo = resultados[0];

			res.render('info_serie', { todo: todo, movie_id: req.query.id });
			console.log(todo);
		});
	},
	//CREANDO UNA RESENA
	add: function (req, res) {
		//esta es la funcion por get
		res.render('add', { movie_id: req.params.movie_id });
	},
	save: function (req, res) {
		//TODO esta funcion me permite crear una resena, cuando el usuario no esta logeado
		//! Nico agrega la primera parte que es un array que reenvia los errores si es que no logra realizar la validacion
		function validarformulario(formulario) {
			let errores = [];
			errores.push('La contraseña es incorrecta');
			//Imprime esto si es que la validacion es incorrecta
			return errores;
		}
		//? Este formulario aparece en la creacion de la resena

		let formulario = {
			password: bycrypt.hashSync(req.body.password, 10)
		};

		//ESTO ES UNA VARIABLE QUE VA A CORRER LA FUNCION validarformulario Y LE VA A PONER EL FORMULARIO CAPTURADO COMO PARAMETRO
		let errores = validarformulario(formulario);

		//! Esta funcion (validar) dentro del modulo lo unico que hace es una comparacion entre el mail y la password
		modulo
			.validar(req.body.email, req.body.password) //valida lo que el usuario completa en el form
			.then((resultado) => {
				console.log(resultado); //me muestra los datos de la bd del usuario
				if (resultado != null) {
					//TODO si existe un resultado, crea la resena. Resultado esta definido en el mdulo de login
					let resena = {
						user_id: resultado.user_id,
						description: req.body.description,
						title: req.body.title,
						movie_id: req.params.movie_id,
						rating: req.body.rating
					};
					console.log(req.params.id);
					db.Resena.create(resena).then(() => {
						res.redirect('/info_serie/?id=' + req.params.movie_id);
					});
				}
				//? Si la validacion no es correcta devolvera la variable errores y redirigira los errores
				else {
					req.session.erroresreseñas = errores;
					//! Imprime los errores en la vista de add.ejs
					res.redirect('back');
					//todo me redirecciona a la misma pag que antes de enviar el formulario
				}
			});
	},
	guardar: function (req, res) {
		//! Esta funcion permite crear una resena cuando el usuario ya esta logeado
		console.log(req.session.usuarioLogeado); //Este me cheackea con la sesion ya abierta y me captura el user_id
		modulo.buscarPorEmail(req.session.usuarioLogeado).then((resultado) => {
			console.log(resultado); //me muestra los datos de la bd del usuario
			let resena = {
				user_id: resultado.user_id,
				description: req.body.description,
				title: req.body.title,
				movie_id: req.params.movie_id,
				rating: req.body.rating
			};
			console.log(req.params.id);
			//todo me crea la resena y me redirecciona a la pagina de la informacion de esta serie
			//? el req.params.id captura el id de arriba y permite redireccionarlo a la pagina de detalle adecuada
			db.Resena.create(resena).then(() => {
				res.redirect('/info_serie/?id=' + req.params.movie_id);
			});
		});
	}
};
module.exports = moduleControllers;
