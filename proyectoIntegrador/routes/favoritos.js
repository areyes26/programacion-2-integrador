var express = require('express');
var router = express.Router();

const controller = require('../controllers/favoritos_controller');

router.get('/', function(req, res, next) {
    res.render('favoritos', { title: 'Express' });
  });

module.exports = router;