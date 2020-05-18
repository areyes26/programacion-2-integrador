var express = require('express');
var router = express.Router();
var moduleControllers = require('../controllers/moduleControllers');
/* GET home page. */
const controller = require("../controllers/info_serie_controller");

  /* GET home page. */
  
  router.get('/', moduleControllers.lista);
  router.get('/add/:id', moduleControllers.add);
  router.post('/add/:id', moduleControllers.save);
  router.post('/delete/:id', moduleControllers.delete);
  router.get('/edit/:id', moduleControllers.edit);
  router.post('/edit/:id', moduleControllers.actualizar);
  
  
  module.exports = router;
  
module.exports = router;