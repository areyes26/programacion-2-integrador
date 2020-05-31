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
 // perfil: function (req,res) {
   // sequelize.query("SELECT*FROM resenas where user_id =" + resultado.user_id)
    //.then(function(resultados){
      //  let todo = resultados[0];

     //res.render("reseniasMias", {todo:todo});
     //console.log(todo)
    //}) 
 // } ,
  login: function (req,res) {
      modulo.validar (req.body.emaillogin, req.body.passwordlogin)  //valida lo que el usuario completa en el form
            .then(resultado=>{  
              console.log(resultado) //me muestra los datos de la bd del usuario
              if(resultado != null && resultado.user_id != 28){ // Si existe el usuario
                sequelize.query("SELECT*FROM resenas where user_id =" + resultado.user_id)
                .then(function(resultados) {
                    let todo = resultados[0];
                    console.log(todo);
                 res.render("reseniasMias", {todo:todo});
                 console.log(todo)
                }) 
              }
                else if(resultado.user_id == 28) {
                  sequelize.query("SELECT*FROM resenas")
                  .then(function(resultados) {
                      let todo = resultados[0];
                      console.log(todo);
                   res.render("reseniasAdmin", {todo:todo});
                   console.log(todo)
                  }) 
                }
                 else {
                    res.redirect("/")
                  }   
                    })
                  },
                  delete: function(req,res) {
                    db.Resena.destroy({
                        where: {
                            resena_id:req.params.id,
                        }
                    })
                .then (() => {
                res.redirect("/")
                })
                },
                edit: function(req,res) {
                    db.Resena.findByPk(req.params.id)
                .then ((resena) => {
                res.render("edit", {resena:resena});
                console.log(resena);
                })
                },
                actualizar: function (req,res){
                    db.Resena.update({
                        description: req.body.description,
                        title: req.body.title,
                        rating: req.body.rating
                    },
                        {
                        where: {
                            resena_id: req.params.id
                        }
                    })
                .then (() => {
                res.redirect("/")
                })
                    }
};
module.exports = signControllers;