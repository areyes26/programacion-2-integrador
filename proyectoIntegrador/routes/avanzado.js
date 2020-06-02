var express = require('express');
var router = express.Router();

const controller = require('../controllers/avanzado_controller');

router.get('/', function (req, res, next) {
	res.render('avanzado', { title: 'Express' });
});

module.exports = router;
