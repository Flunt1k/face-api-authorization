const router = require('express').Router()
const controller = require('../controllers/general')

router.get('/', controller.getWelcomePage)
router.get('/registration', controller.getRegistrationPage)
router.get('/registration/face', controller.getRegistrationFacePage)

module.exports = router
