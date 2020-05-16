var express = require('express');
var router = express.Router();

const controller = require('../controllers/generos_controller');

router.get('/', function(req, res, next) {
    res.render('generos', { title: 'Express' });
  });

module.exports = router;