var express = require('express');
var router = express.Router();
var reseniasControllers = require('../controllers/reseniasControllers');
/* GET home page. */

/* GET home page. */

router.get('/', function (req, res, next) {
	res.render('resenias', { title: 'Express' });
});
router.get('/peores', reseniasControllers.peores);
router.get('/mejores', reseniasControllers.mejores);
router.get('/recientes', reseniasControllers.recientes);

module.exports = router;
