var express = require('express');
var router = express.Router();


let controller = require('../controllers/resultados_controller');



router.post('/errores', controller.errores);

router.get('/', controller.buscador);
module.exports = router;
