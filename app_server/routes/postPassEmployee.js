var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');

/* GET login page */
router.post('/', ctrlMain.postPassEmployee);

module.exports = router;