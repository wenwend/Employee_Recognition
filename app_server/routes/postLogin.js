var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');

/* POST user page */
router.post('/', ctrlMain.postLogin);

module.exports = router;