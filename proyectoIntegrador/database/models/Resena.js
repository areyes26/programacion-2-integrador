module.exports = (sequelize, dataTypes) => {


    let cols = {
resena_id : {
type:dataTypes.INTEGER,
primaryKey:true,
autoIncrement: true
},
title : {
    type:dataTypes.STRING
},
description : {
    type:dataTypes.TEXT
},
user_id : {
    type:dataTypes.INTEGER,
    foreignKey:true
},
movie_id : {
    type:dataTypes.INTEGER
},
rating : {
    type:dataTypes.DECIMAL
}
};
    let config = {
        tableName: "resenas",
        timestamps: false
    };
    const Resena = sequelize.define("Resena", cols, config);
    Resena.associate= function(modelos) {
        Resena.hasMany(modelos.User, {
            as:"usuarios",
            foreignKey: "user_id"
        });
    }
    return Resena;
};