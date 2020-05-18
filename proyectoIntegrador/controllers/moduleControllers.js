let db = require("../database/models");
let sequelize = db.sequelize;

let moduleControllers = {
    lista : function (req,res) {
        sequelize.query("SELECT*FROM resenas where movie_id =" + req.query.id )
        .then(function(resultados){
            let todo = resultados[0];

         res.render("info_serie", {todo:todo,movie_id:req.query.id});
         console.log(todo)
        }) 
    },
    //CREANDO UNA RESENA
add: function(req, res) {
    res.render('add', {movie_id:req.params.id});
},
//AHORA LO VOY A GUARDAR EN LA BASE DE DATOS
save: function (req,res){
    let resena = {
        description: req.body.description,
    title: req.body.title,
   movie_id: req.params.id
    }
    console.log(req.params.id);
db.Resena.create(resena)
.then (() => {
res.redirect("/info_serie/?id=" + req.params.id)
})
},
delete: function(req,res) {
    db.Resena.destroy({
        where: {
            resena_id: req.params.id
        }
    })
.then (() => {
res.redirect("/info_serie")

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
        title: req.body.title},
        {
        where: {
            resena_id: req.params.id
        }
    })
.then (() => {
res.redirect("/info_serie/?id=" + req.params.id)
})
    }
};
module.exports = moduleControllers;