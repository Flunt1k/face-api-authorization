const router = require('express').Router()
const controller = require('../controllers/general')
const sessionChekre = require('../middelware/checkSession')

router.get('/', sessionChekre,controller.getWelcomePage)
router.get('/registration', controller.getRegistrationPage)
router.get('/registration/face', controller.getRegistrationFacePage)
router.get('/registration/default', controller.getRegistrationDefaultPage)
router.get('/face-recorder',sessionChekre, controller.getFaceRecordingPage)
router.get('/login', controller.getLoginPage)
router.get('/login/face', controller.getFaceLoginPage)


module.exports = router
