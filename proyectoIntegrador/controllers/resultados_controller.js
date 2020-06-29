let db = require('../database/models');
let Op = db.Sequelize.Op;
let bycrypt = require('bcryptjs');

//Hasheo: cuando trabajas con datos sensibles, como es una contra, podemos encriptarlos a traves de de la libreria bycryptjs para evitar que alguien acceda a estos datos

let controlador = {
	buscador: function (req, res, next) {
		db.User.findAll({
			where: {
				[Op.or]: [
					{
						username: {
							[Op.like]: '%' + req.query.busqueda + '%'
						}
					},
					{
						email: {
							[Op.like]: '%' + req.query.busqueda + '%'
						}
					}
				]
			}
		}).then((name) => {
			if (name == 0) {
				res.render('resultados', { title: 'Express' });
			} else {
				res.render('buscador', {
					name: name
				});
			}
		});
	},

	errores: function (req, res) {
		function validarformulario(formulario) {
			let errores = [];

			if (formulario.fullname == '') {
				errores.push('Por favor dejame el titulo completo, no vacío che');
			} else if (formulario.username.length < 3) {
				errores.push('Che amigo, al menos 3 caracteres');
			} else if (formulario.password.length < 5) {
				errores.push('La contraseña es muy debil tiene que ser mas larga');
			} else if (formulario.genero_id == '') {
				errores.push('Falta dejar el genero favorito');
			}

			return errores;
		}

		let formulario = {
			fullname: req.body.fullname,
			username: req.body.username,
			email: req.body.email,
			password: bycrypt.hashSync(req.body.password, 10),
			//esto encripta la contra
			genero_id: req.body.genero_id
		};

		let errores = validarformulario(formulario);

		if (errores.length > 0) {
			// Hubieron errores => Volver a mostrar la pagina con el form y los errores
			req.session.erroresregistracion = errores;
			res.redirect('back');
		} else {
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

			// Guardarla en base de datos....
		}
	}
};

module.exports = controlador;
