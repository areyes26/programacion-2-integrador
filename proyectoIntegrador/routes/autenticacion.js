var express = require('express');
var router = express.Router();
var signControllers = require('../controllers/signControllers');

/* GET home page. */

router.get('/', signControllers.signup);
router.post('/', signControllers.save);

module.exports = router;
