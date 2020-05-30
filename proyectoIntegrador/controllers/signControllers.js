let db = require("../database/models");
let sequelize = db.sequelize;
//let passport = require("passport");
let bycrypt = require("bcryptjs")
//Nose porque no funciona esto!!!!!
let modulo = require("../modulo-login");

let signControllers = {
    signup: function(req,res) {
res.render("partials/head")
    },
    save: function(req,res) {
        let user = {
            fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        password: bycrypt.hashSync(req.body.password, 10),
        birthday: req.body.birthday,
        genero_id: req.body.genero_id,
        serie_favorita: req.body.serie_favorita
        }
    db.User.create(user)
    .then (() => {
    res.redirect("/")
    })
    },
    genero_id: function(req,res) {
      var genero_id =(req.body.genero_id)
          },
  //ACA ESTOY VALIDANDO EL LOGIN DEL USUARIO
  login: function (req,res){
      modulo.validar (req.body.emaillogin, req.body.passwordlogin)  //valida lo que el usuario completa en el form
            .then(resultado=>{  
              console.log(resultado) //me muestra los datos de la bd del usuario
              if(resultado != null){ // Si existe el usuario
                console.log(resultado)
                .then (() => {
                  res.redirect("/")
                  })   
                    }})
                  },

};
module.exports = signControllers;