const express = require('express')
const middleware = require('./middelware/index')

const generalRouter = require('./routes/general')
const authRouter = require('./routes/auth')

const app = express()
middleware(app)

app.use('/', generalRouter)
app.use('/api/auth', authRouter)

module.exports = app
