var express = require('express');
var router = express.Router();

const controller = require('../controllers/resultados_controller');

router.get('/', function(req, res, next) {
    res.render('resultados', { title: 'Express' });
  });

module.exports = router;