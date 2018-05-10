var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');

/* GET login page */
router.get('/', ctrlMain.deleteAward);

module.exports = router;