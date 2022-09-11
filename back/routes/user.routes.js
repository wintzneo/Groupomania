const express = require("express");
const router = express.Router();

const userCtrl = require('../controllers/user.control');
const auth = require('../middleware/auth')

// create / post
router.post('/signup',userCtrl.signup);
router.post('/login',userCtrl.login);

// read / get
router.get('/', auth, userCtrl.all)
router.get('/likes', auth, userCtrl.oneUser)

module.exports = router;