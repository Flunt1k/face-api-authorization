const express = require('express')
const middleware = require('./middelware/index')

const generalRouter = require('./routes/general')
const authRouter = require('./routes/auth')
const chatRouter = require('./routes/chat')

const app = express()
middleware(app)

app.use('/', generalRouter)
app.use('/api/auth', authRouter)
app.use('/api/chat', chatRouter)

module.exports = app
