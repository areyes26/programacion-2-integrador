var express = require('express');
var router = express.Router();
let db = require("../database/models");
let sequelize = db.sequelize;

const controller = require('../controllers/resultados_controller');

router.get('/', function(req, res, next) {
    
   db.User.findAll(
          {
              where: [
                  { email: req.query.busqueda }
              ],
          }
              )
  .then((User) => {
      
          if (User == 0) {
            res.render('resultados', { title: 'Express' });
          } else {
            res.send(User)
          }
           
          
      
  })
     
  });

module.exports = router;