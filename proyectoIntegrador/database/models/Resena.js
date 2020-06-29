//! La basa de datos es una pieza de software donde se almacenara informacion. Sirve para almacenar, acceder, manipular y combinar, y analizar los datos.
//? Sequelize es un orm(object relational mapping), es un modelo de program que consiste en la transformacion de las tablas de una base de datos e una serie
//? de entidades que simplifiquen las tareas basicas de acceso, nos ayuda a conectar e interactuar con la base de datos
//TODO El modelo Resena es una representacion de nuestra tabla en codigo, permite acceder a la capa de almacenamiento de datos de la table: 'resenas'
module.exports = (sequelize, dataTypes) => {
	//! Toma dos parametros: sequelize que permite acceder al metodo define y Dattypes que nos indica el tipo de datos
	//? Cols es un objeto donde se van a definir los datos
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
		Resena.belongsTo(modelos.User, {
			as: 'usuarios',
			foreignKey: 'user_id'
		});
	};
	return Resena;
};
