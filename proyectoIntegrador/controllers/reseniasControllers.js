let db = require('../database/models');
let sequelize = db.sequelize;

let reseniasControllers = {
	peores: function (req, res) {
		sequelize
			.query('SELECT*FROM resenas JOIN users ON users.user_id = resenas.user_id ORDER BY rating')
			.then(function (resultados) {
				let todo = resultados[0];

				res.render('reseniasPeores', { todo: todo });
				console.log(todo);
			});
	},
	mejores: function (req, res) {
		sequelize
			.query('SELECT*FROM resenas JOIN users ON users.user_id = resenas.user_id ORDER BY rating DESC')
			.then(function (resultados) {
				let todo = resultados[0];

				res.render('reseniasMejores', { todo: todo });
				console.log(todo);
			});
	},
	recientes: function (req, res) {
		sequelize
			.query('SELECT*FROM resenas JOIN users ON users.user_id = resenas.user_id ORDER BY createdAt DESC')
			.then(function (resultados) {
				let todo = resultados[0];

				res.render('reseniasRecientes', { todo: todo });
				console.log(todo);
			});
	}
};
module.exports = reseniasControllers;
