const router = require('express').Router()
const controller = require('../controllers/general')

router.get('/', controller.getWelcomePage)
router.get('/registration', controller.getRegistrationPage)
router.get('/registration/face', controller.getRegistrationFacePage)
router.get('/registration/default', controller.getRegistrationDefaultPage)
router.get('/face-recorder', controller.getFaceRecordingPage)

module.exports = router
