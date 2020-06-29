module.exports = (sequelize, dataTypes) => {
	let cols = {
		user_id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		fullname: {
			type: dataTypes.STRING
		},
		username: {
			type: dataTypes.STRING
		},
		password: {
			type: dataTypes.STRING
		},
		email: {
			type: dataTypes.STRING
		},
		serie_favorita: {
			type: dataTypes.STRING
		},
		birthday: {
			type: dataTypes.DATE
		},
		genero_id: {
			type: dataTypes.INTEGER
		}
	};
	let config = {
		tableName: 'users',
		timestamps: false
	};
	const User = sequelize.define('User', cols, config);
	User.associate = function (modelos) {
		User.hasMany(modelos.Resena, {
			as: 'resenas',
			foreignKey: 'user_id'
		});
	};
	return User;
};
