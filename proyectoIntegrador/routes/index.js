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
router.post('/login', signControllers.login);
router.get('/login/delete/:id', function (req,res) {
  res.render("eliminar", {tipo:"delete", deleteId: req.params.id})
});
router.post('/login/delete/:id', signControllers.delete);
  router.get('/login/edit/:id', signControllers.edit);
  router.post('/login/edit/:id', signControllers.actualizar);
//Falta agregar validacion tanto si quiere eliminar una resena y tmbn cuando quiere editar una


router.get("/login2" , signControllers.login2);
// INTENTO DE LOGIN MAS QUE FALLIDO router.post("/login2",signControllers.processLogin);

 // router.get('/pruebaSession', function(req,res){
//if(req.session.numeroVisitas == undefined){
  //req.session.numeroVisitas = 0;
//}
//req.session.numeroVisitas++; 
//res.send('Session tiene el numero: ' + req.session.numeroVisitas);
  //});

module.exports = router;
