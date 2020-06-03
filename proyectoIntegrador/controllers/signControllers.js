let db = require('../database/models');
let sequelize = db.sequelize;
//let passport = require("passport");
let bycrypt = require('bcryptjs');
//Nose porque no funciona esto!!!!!
let modulo = require('../modulo-login');

let signControllers = {
	signup: function (req, res) {
		res.render('partials/head');
	},
	save: function (req, res) {
		let user = {
			fullname: req.body.fullname,
			username: req.body.username,
			email: req.body.email,
			password: bycrypt.hashSync(req.body.password, 10),
			birthday: req.body.birthday,
			genero_id: req.body.genero_id,
			serie_favorita: req.body.serie_favorita
		};
		db.User.create(user).then(() => {
			res.redirect('/');
		});
	},
	genero_id: function (req, res) {
		var genero_id = req.body.genero_id;
	},
	// perfil: function (req,res) {
	// sequelize.query("SELECT*FROM resenas where user_id =" + resultado.user_id)
	//.then(function(resultados){
	//  let todo = resultados[0];

	//res.render("reseniasMias", {todo:todo});
	//console.log(todo)
	//})
	// } ,
	login: function (req, res) {
		modulo
			.validar(req.body.emaillogin, req.body.passwordlogin) //valida lo que el usuario completa en el form
			.then((resultado) => {
				console.log(resultado); //me muestra los datos de la bd del usuario
				if (resultado != null) {
					//! Si existe el usuario, esto me lleva al login general
					req.session.usuarioLogeado = req.body.emaillogin;
					//TODO aca le estoy haciendo un cookie para que cuando salga de la pagina me lo recuerde
					if (req.body.recordame != undefined) {
						res.cookie('recordame', req.session.usuarioLogeado, {
							maxAge: 300000
							//! Esto se guarda por 5 minutos
						});
					}
					res.redirect('/login');
				} else {
					//? ESTO ES PARA LOS ERRORES DE FEDE let error = 'Por favor ingrese usuario y contraseña válidos';
					res.redirect('/');
				}
			});
	},
	misResenas: function (req, res) {
		modulo.buscarPorEmail(req.session.usuarioLogeado).then((resultado) => {
			console.log(resultado); //me muestra los datos de la bd del usuario
			if (resultado != null && resultado.user_id != 28) {
				//! Si existe el usuario, utilizo el sequelize porque me siento mas comodo con el lenguaje
				sequelize
					.query('SELECT*FROM resenas where user_id =' + resultado.user_id)
					.then(function (resultados) {
						let todo = resultados[0];
						console.log(todo);
						res.render('reseniasMias', { todo: todo });
						console.log(todo);
					});
			} else if (resultado.user_id == 28) {
				sequelize.query('SELECT*FROM resenas').then(function (resultados) {
					let todo = resultados[0];
					console.log(todo);
					res.render('reseniasAdmin', { todo: todo });
					console.log(todo);
				});
			} else {
				res.redirect('/');
			}
		});
	},
	logout: function (req, res) {
		req.session.destroy();
		res.redirect('/');
	},
	delete: function (req, res) {
		console.log(req.body);
		modulo
			.validar(req.body.email, req.body.password) //valida lo que el usuario completa en el form
			.then((resultado) => {
				console.log(req.body);
				//me muestra los datos de la bd del usuario
				if (
					resultado != null
					//resultado.user_id ==
					//	sequelize.query(
					//		'SELECT user_id FROM resenas where resena_id =' + req.params.id
					//	)
				) {
					console.log(req.body);
					db.Resena.destroy({
						where: {
							resena_id: req.params.id
						}
					}).then(() => {
						res.redirect('/');
					});
				} else if (resultado != null && resultado.user_id == 28) {
					console.log(req.body);
					db.Resena.destroy({
						where: {
							resena_id: req.params.id
						}
					}).then(() => {
						res.redirect('/');
					});
				} else {
					console.log(req.body);
					res.redirect('/login/delete/' + req.params.id);
				}
			});
	},
	edit: function (req, res) {
		db.Resena.findByPk(req.params.id).then((resena) => {
			res.render('edit', { resena: resena });
			console.log(resena);
		});
	},
	actualizar: function (req, res) {
		modulo
			.validar(req.body.email, req.body.password) //valida lo que el usuario completa en el form
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
						res.redirect('/');
					});
				} else {
					res.redirect('/login/edit/' + req.params.id);
				}
			});
	}
};
module.exports = signControllers;
