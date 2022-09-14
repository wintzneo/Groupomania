const express = require('express')
const router = express.Router()

const profile = require('../controllers/profile.control')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

//Lire/Récupérer
router.get('/:id', auth, profile.getProfile)

//Modifier
router.put('/:id', auth, multer, profile.editProfile)


module.exports = router;