let db = require("../database/models");
let sequelize = db.sequelize;
let modulo = require("../modulo-login");

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
    res.render('add', {movie_id:req.params.movie_id});
},
//AHORA LO VOY A GUARDAR EN LA BASE DE DATOS

/*nuevaResena: (req,res)  =>{
    modulo.validar(req.body.email, req.body.password)  //valida lo que el usuario completa en el form
    .then(resultado=>{  
      console.log(resultado) //me muestra los datos de la bd del usuario
    
      if(resultado != null){ // si existe un resultado, crea la resena. Resultado esta definido en el mdulo de login
      let nuevaResena= {   
        resena: req.body.comment, //saca la info de lo q competa el usuario
        puntaje: req.body.puntaje, // saca la info de lo q completa el usuario
        idUsuario: resultado.id, //lo saca de los datos que me trajo mi base de datos
        idPelicula: req.body.idPelicula, //idPelicula esta definida arriba de todo
        createdAt: playitBD.sequelize.literal("CURRENT_DATE") // para que se guarde la fecha de hoy
      }
      console.log (nuevaResena)
      playitBD.resenas.create(nuevaResena) //crea la resena en la tabla de la bd cn lo que escribio el usuario
      .then
*/



save: function (req,res){
        modulo.validar(req.body.email, req.body.password)  //valida lo que el usuario completa en el form
        .then(resultado=>{  
          console.log(resultado) //me muestra los datos de la bd del usuario
        
          if(resultado != null){ // si existe un resultado, crea la resena. Resultado esta definido en el mdulo de login
            let resena = {
                description: req.body.description,
                title: req.body.title,
               movie_id: req.params.movie_id,
               rating: req.body.rating
                }
                console.log(req.params.id);
                db.Resena.create(resena)
                .then (() => {
                res.redirect("/info_serie/?id=" + req.params.movie_id)
                })
        }})
    },
delete: function(req,res) {
    db.Resena.destroy({
        where: {
            movie_id:req.params.movie_id,
            resena_id:req.params.id,
            
        }
    })
.then (() => {
res.redirect("/info_serie/?id=" + req.params.movie_id)

})
},
edit: function(req,res) {
    db.Resena.findByPk(req.params.id)
.then ((resena) => {
res.render("edit", {movie_id:req.params.movie_id, resena:resena});
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
            movie_id:req.params.movie_id,
            resena_id: req.params.id
        }
    })
.then (() => {
res.redirect("/info_serie/?id=" + req.params.movie_id)
})
    }
};
module.exports = moduleControllers;