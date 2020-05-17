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
    type:dataTypes.INTEGER
},
};
    let config = {
        tableName: "resenas",
        timestamps: false
    };
    const Resena = sequelize.define("Resena", cols, config);
    return Resena;
};