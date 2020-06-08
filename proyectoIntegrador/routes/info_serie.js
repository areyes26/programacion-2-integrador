var express = require('express');
var router = express.Router();
var moduleControllers = require('../controllers/moduleControllers');
/* GET home page. */
const controller = require('../controllers/info_serie_controller');

/* GET home page. */

router.get('/', moduleControllers.lista);
router.get('/add/:movie_id', moduleControllers.add);
//! El GET request, pide una data de una fuente especifica
//? El POST request publica data a una fuente especifica para que esta sea procesada
router.post('/add/:movie_id', moduleControllers.save);
router.post('/guardar/:movie_id', moduleControllers.guardar);
module.exports = router;

module.exports = router;
