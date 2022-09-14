const express = require("express");
const router = express.Router();

const user = require('../controllers/user.control');
const auth = require('../middleware/auth')

//S'enregister/Login
router.post('/signup',user.signup);
router.post('/login',user.login);

//Lire/Récupérer
router.get('/', auth, user.all)
router.get('/profile', auth, user.oneUserProfile)
router.get('/likes', auth, user.oneUser)

//Supprimer
router.delete('/:id', auth, user.deleteUser)
router.delete('/', auth, user.deleteOwn)

module.exports = router;