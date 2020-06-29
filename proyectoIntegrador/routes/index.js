var express = require('express');
var router = express.Router();
//se declara router que es una variable que guarda la ejecucion del metodo Router que nos proporciona Express
var signControllers = require('../controllers/signControllers');
/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});
//! Renderiza la vista index
//TODO El protocolo HTTP(Hypertext Transfer Protocol) define una serie de reglas que es necesario seguir para que la info sea procesada
//TODO El flujo de transaccion viene con varios metodos que definen lo que pasara con cada pedido que le solicite un cliente al servidor
router.get('/', signControllers.signup);
//* Este metodo recibe las peticiones que vienen de la URL del navegador o por enlace, retorna vistas, archivos o datos.
/* El boton de registrar lo hizo nico por otro lado */
router.post('/login', signControllers.login);
//? Importa del controller el metodo login, al utilizar el path: /login
// El metodo post permite enviar info sensible al servidor o crear un nuevo recurso
router.get('/login', signControllers.misResenas);
router.get('/login/delete/:id', signControllers.borrar);
//! :id es una ruta parametrizada, que se obtiene mediante la peticion get. Pueden existin rutas parametrizadas con valores optativos
router.get('/logout', signControllers.logout);
router.post('/login/delete/:id', signControllers.delete);
router.get('/login/edit/:id', signControllers.edit);
router.post('/login/edit/:id', signControllers.actualizar);

//TODO Diferencias POST Y GET:
//! El get viaja por url y es visible la info, el POST oculto y queda encripta la info
//! GET puede ser cacheado y guardarse como marcado, el POST no y no
//! GET restriccion en largo, POST no
//! GET manipula datos que no son sensibles, el POST si
//! No se reenvian al recargar el sitio, si se reenvian por eso el msje

module.exports = router;
