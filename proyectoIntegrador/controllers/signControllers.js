let db = require("../database/models");
let sequelize = db.sequelize;
//let passport = require("passport");
let bycrypt = require("bcryptjs")
//tengo que acomodar todo el ruteo!!!!!

let signControllers = {
    signup: function(req,res) {
res.render("index")
    },
    save: function(req,res) {
        let user = {
            fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        password: bycrypt.hashSync(req.body.password, 10)
        }
    db.User.create(user)
    .then (() => {
    res.send("Usuario creado")
    })
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