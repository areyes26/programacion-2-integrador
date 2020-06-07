var express = require('express');
var router = express.Router();

const controller = require('../controllers/reseniasXuser_controller');

router.get('/', controller.misResenas);


module.exports = router;
