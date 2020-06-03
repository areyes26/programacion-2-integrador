var express = require('express');
var router = express.Router();
let db = require('../database/models');
let Op = db.Sequelize.Op;

const controller = require('../controllers/resultados_controller');

function validarformulario(formulario) {
	let errores = [];

	if (formulario.fullname == '') {
		errores.push('Por favor dejame el titulo completo, no vacío che');
	} else if (formulario.username.length < 3) {
		errores.push('Che amigo, al menos 3 caracteres');
	} else if ((formulario.password.length < 5)) {
		errores.push('La contraseña es muy debil tiene que ser mas larga');
	} else if (formulario.genero_id == '') {
		errores.push('Falta dejar el genero favorito');
	}

	return errores;
}

router.post('/errores', function (req, res) {
	let formulario = {
		fullname: req.body.fullname,
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
		genero_id: req.body.genero_id,
		serie_favorita: req.body.serie_favorita
	};

	let errores = validarformulario(formulario);

	if (errores.length > 0) {
		// Hubieron errores => Volver a mostrar la pagina con el form y los errores
		req.session.erroresregistracion = errores;
		res.redirect('back');
	} else {
		
		db.User.create(formulario).then((user) => {
			res.render('registro', {
				user:user
			})
		} )
		
		// Guardarla en base de datos....
	}
});

router.get('/', function (req, res, next) {
	db.User.findAll({
		where: [{ email: { [Op.like]: '%' + req.query.busqueda + '%' } }]
	}).then((User) => {
		if (User == 0) {
			db.User.findAll({
				where: [{ username: { [Op.like]: '%' + req.query.busqueda + '%' } }]
			}).then((name) => {
				if (name == 0) {
					res.render('resultados', { title: 'Express' });
				} else {
					res.render('buscador', {
						name: name
					});
				}
			});
		} else {
			res.render('buscador2', {
				User: User
			});
		}
	});
});
module.exports = router;
