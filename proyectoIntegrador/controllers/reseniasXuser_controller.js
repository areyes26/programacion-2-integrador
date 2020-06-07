let db = require('../database/models');
let sequelize = db.sequelize;
//let passport = require("passport");
let bycrypt = require('bcryptjs');
//Nose porque no funciona esto!!!!!
let modulo = require('../modulo-login');

let controller = {

    misResenas: function (req, res) {
        
        
        let id_del_usuario = req.query.idXuser;
        sequelize
        .query('SELECT*FROM resenas where user_id =' + id_del_usuario)
            .then(function(resultados){
                let todo = resultados [0];
                console.log(todo);
                res.render("reseniasXuser", {todo:todo});
                console.log(todo);

            })
	},

};
module.exports = controller;