module.exports = function(app) {
  const express = require('express')
  const mongoose = require('mongoose')
  const path = require('path')
  const logger = require('morgan')
  const cors = require('cors')
  const session = require('express-session')
  const MongoStore = require('connect-mongo')(session)
  const cookieParser = require('cookie-parser')
  const keys = require('../keys/keys')
  const setLocals = require('../middelware/setLocals')
  const faceapi = require('face-api.js')
  const canvas = require('canvas')
  require('@tensorflow/tfjs-node')

  const {Canvas, Image, ImageData} = canvas
  faceapi.env.monkeyPatch({Canvas, Image, ImageData})

  mongoose.connect(keys.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  app.set('view engine', 'hbs')
  app.set('views', path.join(__dirname,'..', 'views'))

  app.use(session({
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 60*60*24
    }),
    name: 'user_sid',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    secret: 'face-api-chat',
    cookie: {
      httpOnly: true,
      maxAge: 1000*60*60*24
    }
  }))
  app.use(logger('dev'))
  app.use(express.urlencoded({extended: true}))
  app.use(express.json({limit: '50mb'}))
  app.use(express.static(path.join(__dirname, '..', 'public')))
  app.use(cors())
  app.use(cookieParser())
  app.use(setLocals)
}
