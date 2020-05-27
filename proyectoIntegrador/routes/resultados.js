var express = require('express');
var router = express.Router();
let db = require("../database/models");
let Op = db.Sequelize.Op;



const controller = require('../controllers/resultados_controller');

function validarformulario(formulario) {
  let errores = [];

  function validarPelicula(pelicula) {
    let errores = [];

    if (pelicula.title == "") {
        errores.push("Por favor dejame el titulo completo, no vacío che")
    } else if (pelicula.title.length < 3) {
        errores.push("Che amigo, al menos 3 caracteres")
    }

    if (isNaN(pelicula.length)) {
        errores.push("Che amigo, la duracion tiene que ser un numero")
    }

    return errores;
}


  if (isNaN(formulario.password)) {
      errores.push("Che amigo, la contraseña tiene que ser un numero")
  }

  return errores;
}



router.get('/detalle', function(req, res) {



  db.User.findAll(
    {
        where: [
            { username: {[Op.like] : "%" + reque + "%"} },
  
        ],
    }
        )
.then((User) => {

  res.render('detallebusqueda', {
    User: User,
  })
 
})
 })




router.post('/errores', function(req, res) {
  let formulario = {
    fullname: req.body.fullname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
   
}

let errores = validarformulario(formulario)

if (errores.length > 0) {
  // Hubieron errores => Volver a mostrar la pagina con el form y los errores
  
      res.send(document.querySelector("botton").click())
      
  
} else {
  // No hubieron errores, todo bien :)
  res.send()
  // Guardarla en base de datos....
}
})

router.get('/', function(req, res, next) {
    
   db.User.findAll(
          {
              where: [
                  { email: {[Op.like] : "%" + req.query.busqueda + "%"} },
        
              ],
          }
              )
  .then((User) => {
      
          if (User == 0) {
            db.User.findAll(
              {
                  where: [
                      { username: {[Op.like] : "%" + req.query.busqueda + "%"} }
                  ],
              }
                  )
      .then((name) => {
        
          if (name == 0) {
            res.render('resultados', { title: 'Express' });
          } else {
            res.render('buscador', {
              
              name: name,
            })
          }
          
  })
      } else { 
        
        res.render('buscador2', {
              
          User: User,
        })
       
      }
      
  });
  

 })
module.exports = router;