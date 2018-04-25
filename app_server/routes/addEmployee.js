var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');

/* GET add employee page */
router.get('/', ctrlMain.addEmployee);

module.exports = router;