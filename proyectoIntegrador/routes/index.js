var express = require('express');
var router = express.Router();
var signControllers = require('../controllers/signControllers');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', signControllers.signup);
router.post('/', signControllers.save);
router.post('/', signControllers.genero_id);
//router.get('/login:user_id', signControllers.perfil);
router.post('/login:user_id', signControllers.login);


module.exports = router;
