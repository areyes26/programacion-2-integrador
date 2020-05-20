var express = require('express');
var router = express.Router();
let db = require("../database/models");
let Op = db.Sequelize.Op;

const controller = require('../controllers/resultados_controller');



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