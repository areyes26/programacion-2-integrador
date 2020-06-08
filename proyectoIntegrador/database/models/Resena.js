module.exports = (sequelize, dataTypes) => {
	let cols = {
		resena_id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		//? Antes el title era un VARCHAR(16) como estaba limitado a esta cantidad de palabras fue modificado para que sea un texto
		title: {
			type: dataTypes.TEXT
		},
		description: {
			type: dataTypes.TEXT
		},
		user_id: {
			type: dataTypes.INTEGER,
			foreignKey: true
		},
		movie_id: {
			type: dataTypes.INTEGER
		},
		rating: {
			type: dataTypes.DECIMAL
		}
	};
	let config = {
		tableName: 'resenas',
		timestamps: false
	};
	const Resena = sequelize.define('Resena', cols, config);
	Resena.associate = function (modelos) {
		Resena.hasMany(modelos.User, {
			as: 'usuarios',
			foreignKey: 'user_id'
		});
	};
	return Resena;
};
