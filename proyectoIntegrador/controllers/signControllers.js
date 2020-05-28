let db = require("../database/models");
let sequelize = db.sequelize;
//let passport = require("passport");
let bycrypt = require("bcryptjs")
//Nose porque no funciona esto!!!!!

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
        genero_id: req.body.genero_id
        }
    db.User.create(user)
    .then (() => {
    res.redirect("/")
    })
    },
    genero_id: function(req,res) {
      var genero_id =(req.body.genero_id)
          }
    //, autentic: function(req,res) {
      //  passport.authenticate('local.signup', {
        //    successRedirect:"/profile", //Te lo redirecciona si es exiosa a tu perfil
          //  failureRedirect: "/"
        //})
    //},
//profile: function(req,res){
  //  res.send("Esto es tu perfil")
//}
};
module.exports = signControllers;