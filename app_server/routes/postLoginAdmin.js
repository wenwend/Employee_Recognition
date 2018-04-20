var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');

/* POST admin page */
router.post('/', ctrlMain.postLoginAdmin);

module.exports = router;