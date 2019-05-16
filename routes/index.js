var express = require('express');
var router = express.Router();
var indexCtrl = require('../controllers/index');

router.get('/', indexCtrl.index);

module.exports = router;