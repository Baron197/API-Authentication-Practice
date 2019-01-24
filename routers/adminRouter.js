var express = require('express')
var router = express.Router()
const { adminController } = require('../controllers')
const { auth } = require('../helpers/auth');

router.get('/getuserlist', auth, adminController.getuserlist)

module.exports = router;