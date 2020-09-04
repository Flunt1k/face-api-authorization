const router = require('express').Router()
const controller = require('../controllers/chat')

router.post('/', controller.createChat)

module.exports = router
