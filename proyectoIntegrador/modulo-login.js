let db = require('./database/models');
let bcryptjs = require('bcryptjs');
let moduloLogin = {
	chequearUsuario: function (email) {
		return db.User.findOne({
			where: {
				email: email
			}
		}).then(function (usuario) {
			return usuario != null;
		});
	},

	buscarPorEmail: function (email) {
		return db.User.findOne({
			where: {
				email: email
			}
		}).then((resultado) => {
			return resultado;
		});
	},

	validar: function (email, password) {
		return db.User.findOne({
			where: {
				email: email
			}
		}).then((results) => {
			console.log('-------------');
			console.log(email);
			console.log('---------------');
			console.log(results);
			//aca compara los datos que puse en la contra con la contra de la base de datos
			if (results && bcryptjs.compareSync(password, results.password)) {
				return results;
			} else {
				return null;
			}
		});
	}
};

module.exports = moduloLogin;
