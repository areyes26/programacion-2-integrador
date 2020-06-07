var express = require('express');
var router = express.Router();
var signControllers = require('../controllers/signControllers');
/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/', signControllers.signup);
/* El boton de registrar lo hizo nico por otro lado */
router.post('/login', signControllers.login);
router.get('/login', signControllers.misResenas);
router.get('/login/delete/:id', signControllers.borrar);
router.get('/logout', signControllers.logout);
router.post('/login/delete/:id', signControllers.delete);
router.get('/login/edit/:id', signControllers.edit);
router.post('/login/edit/:id', signControllers.actualizar);

module.exports = router;
