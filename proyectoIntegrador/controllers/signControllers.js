let db = require('../database/models');
let sequelize = db.sequelize;
//let passport = require("passport");
let bycrypt = require('bcryptjs');
//Nose porque no funciona esto!!!!!
let modulo = require('../modulo-login');

//! El controller es un bloque de codigo, que permite la vinculacion entre el modelo y la vista dentro del modelo MVC. Se encarga de que el pedido hecho por
//! el cliente se procese y se conecte con el moodelo. Es donde se guarda toda la logica de la aplicacion

let signControllers = {
	signup: function (req, res) {
		res.render('partials/head');
	},
	login: function (req, res) {
		function validarformulario(formulario) {
			let errores = [];

			errores.push('Tu contraseña es incorrecta');

			return errores;
		}

		let formulario = {
			passwordlogin: req.body.passwordlogin
		};

		let errores = validarformulario(formulario);

		modulo
			.validar(req.body.emaillogin, req.body.passwordlogin) //valida lo que el usuario completa en el form
			//TODO Aca se puede observar una promesa, un funcion que se puede ejecutar codigo de manera asincronica de manera eficiente
			//El .then me va a retornar o no un resultado
			.then((resultado) => {
				console.log(resultado); //me muestra los datos de la bd del usuario
				if (resultado != null) {
					//! Si existe el usuario, esto me lleva al login general
					// Aca es donde defino que el usuario obtenga este email
					req.session.usuarioLogeado = req.body.emaillogin;
					console.log('A continuacion se va a ver la variable usuarioLogeado');
					console.log(req.session.usuarioLogeado);
					//TODO aca le estoy haciendo un cookie para que cuando salga de la pagina me lo recuerde
					if (req.body.recordame != undefined) {
						//Obtiene el name "recordame" del checkbox de login y si esta checkeado guarda a ese mail
						res.cookie('recordame', req.session.usuarioLogeado, {
							maxAge: 300000
							//! Esto se guarda por 5 minutos
						});
					}
					res.redirect('/login');
				} else {
					//? Aca lo que hace es imprimir los errores de arriba y se lo adjudica a erroresLogin que se cruza con toda la aplicacion
					req.session.erroreslogin = errores;
					res.redirect('back');
					//se reenvia al lugar donde estaba
				}
			});
	},
	misResenas: function (req, res) {
		if (req.session.usuarioLogeado) {
			modulo.buscarPorEmail(req.session.usuarioLogeado).then((resultado) => {
				console.log(resultado); //me muestra los datos de la bd del usuario
				if (resultado != null && resultado.user_id != 28) {
					//! Si existe el usuario, utilizo el sequelize porque me siento mas comodo con el lenguaje
					//? Esto es un raw query, con sequelize puedo manipular la base de datis mediante consultas sql
					sequelize.query('SELECT*FROM resenas where user_id =' + resultado.user_id).then(function (resultados) {
						let todo = resultados[0];
						console.log(todo);
						res.render('reseniasMias', { todo: todo });
						console.log(todo);
					});
				} else if (resultado.user_id == 28) {
					sequelize.query('SELECT*FROM resenas JOIN users ON users.user_id = resenas.user_id').then(function (resultados) {
						//Esto se podria hacer mediante db.Resena.findAll({ include: [{asocciation: "usuarios"}]})
						// La funcion find... permite buscar info en la base de datos
						let todo = resultados[0];
						console.log(todo);
						res.render('reseniasAdmin', { todo: todo });
						console.log(todo);
					});
				} else {
					res.redirect('/');
				}
			});
		} else {
			res.render('logear');
		}
	},
	logout: function (req, res) {
		req.session.destroy();
		res.redirect('/');
	},
	//Borrar es la funcion get
	borrar: function (req, res) {
		if (req.session.usuarioLogeado) {
			modulo
				.buscarPorEmail(req.session.usuarioLogeado) //
				.then((results) => {
					let dataUsuario = results;
					console.log('Aca va el console log de Data Usuario');
					console.log(dataUsuario);
					db.Resena.findByPk(req.params.id).then((resena) => {
						if (resena.user_id == dataUsuario.user_id) {
							res.render('eliminar', { tipo: 'delete', deleteId: req.params.id });
						} else if (resena.user_id != dataUsuario.user_id) {
							res.render('noes');
						}
					});
				});
		} else {
			res.render('logeate');
		}
	},
	delete: function (req, res) {
		console.log(req.body);
		modulo
			.buscarPorEmail(req.session.usuarioLogeado) //
			.then((resultado) => {
				console.log(resultado);
				//me muestra los datos de la bd del usuario
				if (resultado != null) {
					console.log(req.body);
					db.Resena.destroy({
						where: {
							resena_id: req.params.id
						}
					}).then(() => {
						res.redirect('/login');
					});
				} else if (resultado != null && resultado.user_id == 28) {
					console.log(req.body);
					db.Resena.destroy({
						where: {
							resena_id: req.params.id
						}
					}).then(() => {
						res.redirect('/login');
					});
				} else {
					console.log(req.body);
					res.redirect('/login/delete/' + req.params.id);
				}
			});
	},
	edit: (req, res) => {
		if (req.session.usuarioLogeado) {
			modulo
				.buscarPorEmail(req.session.usuarioLogeado) //
				.then((results) => {
					let dataUsuario = results;
					db.Resena.findByPk(req.params.id).then((resena) => {
						if (resena.user_id == dataUsuario.user_id) {
							res.render('edit', { resena: resena });
						} else if (resena.user_id != dataUsuario.user_id) {
							res.render('noes');
						}
					});
				});
		} else {
			res.render('logeate');
		}
	},
	actualizar: function (req, res) {
		modulo
			.buscarPorEmail(req.session.usuarioLogeado) //valida lo que el usuario completa en el form
			.then((resultado) => {
				console.log(resultado); //me muestra los datos de la bd del usuario
				if (
					resultado != null
					//resultado.user_id ==
					//	sequelize.query(
					//		'SELECT user_id FROM resenas where resena_id =' + req.params.id
					//	)
				) {
					//Le tendria que agregar que coincida el resultado.user_id con el de resenia
					db.Resena.update(
						{
							description: req.body.description,
							title: req.body.title,
							rating: req.body.rating
						},
						{
							where: {
								resena_id: req.params.id
							}
						}
					).then(() => {
						res.redirect('/login');
					});
				} else {
					res.redirect('/login/edit/' + req.params.id);
				}
			});
	}
};
module.exports = signControllers;
// Exporta el objeto literal signControllers para que pueda ser utilizado en la ruta index.js
// Manejan los handlers de las rutas, exporta los modulos de un script.
