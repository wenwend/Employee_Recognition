var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');

/* GET add admin page */
router.get('/', ctrlMain.addAdmin);

module.exports = router;