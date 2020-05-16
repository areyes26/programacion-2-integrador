var express = require('express');
var router = express.Router();

/* GET home page. */
const controller = require('../controllers/info_serie_controller');

router.get('/', function(req, res, next) {
    res.render('info_serie', { title: 'Express' });
  });

module.exports = router;