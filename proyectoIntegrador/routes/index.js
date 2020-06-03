var express = require('express');
var router = express.Router();
var signControllers = require('../controllers/signControllers');
/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/', signControllers.signup);
router.post('/', signControllers.save);
router.post('/', signControllers.genero_id);
//router.get('/login:user_id', signControllers.perfil);
router.post('/login', signControllers.login);
router.get('/login', signControllers.misResenas);
router.get('/login/delete/:id', function (req, res) {
	res.render('eliminar', { tipo: 'delete', deleteId: req.params.id });
});
router.get('/logout', signControllers.logout);
router.post('/login/delete/:id', signControllers.delete);
router.get('/login/edit/:id', signControllers.edit);
router.post('/login/edit/:id', signControllers.actualizar);

module.exports = router;
