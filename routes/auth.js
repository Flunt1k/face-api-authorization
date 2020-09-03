const router = require('express').Router()
const controller = require('../controllers/auth')

router.post('/registration', controller.registerUser)
router.post('/face-registration', controller.registerUsersFace)
router.post('/login', controller.loginUser)
router.post('/login/face', controller.loginUserFace)
router.get('/logout', controller.logoutUser)

module.exports = router
