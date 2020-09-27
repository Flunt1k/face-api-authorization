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
  const hbs = require('hbs')
  const setLocals = require('../middelware/setLocals')
  const faceapi = require('face-api.js')
  const canvas = require('canvas')
  require('@tensorflow/tfjs-node')

  const {Canvas, Image, ImageData} = canvas
  faceapi.env.monkeyPatch({Canvas, Image, ImageData})

  hbs.registerHelper('compare', function(lvalue, operator, rvalue, options) {
    var operators, result
    if (arguments.length < 3) {
      throw new Error('Handlerbars Helper \'compare\' needs 2 parameters')
    }
    if (options === undefined) {
      options = rvalue
      rvalue = operator
      operator = '==='
    }

    operators = {
      '==': function(l, r) { return l == r },
      '===': function(l, r) { return l === r },
      '!=': function(l, r) { return l != r },
      '!==': function(l, r) { return l !== r },
      '<': function(l, r) { return l < r },
      '>': function(l, r) { return l > r },
      '<=': function(l, r) { return l <= r },
      '>=': function(l, r) { return l >= r },
      'typeof': function(l, r) { return typeof l == r },
    }

    if (!operators[operator]) {
      throw new Error('Handlerbars Helper \'compare\' doesn\'t know the operator ' + operator)
    }

    result = operators[operator](lvalue.toString(), rvalue.toString())

    if (result) {
      console.log(123)
      return options.fn(this)
    } else {
      console.log(456)
      return options.inverse(this)
    }

  })
  mongoose.connect(keys.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  const sessionObject = session({
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 60 * 60 * 24,
    }),
    name: 'user_sid',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    secret: 'face-api-auth',
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })


  app.set('view engine', 'hbs')
  app.set('views', path.join(__dirname, '..', 'views'))

  app.use(sessionObject)
  app.use(logger('dev'))
  app.use(express.urlencoded({extended: true}))
  app.use(express.json({limit: '50mb'}))
  app.use(express.static(path.join(__dirname, '..', 'public')))
  app.use(cors())
  app.use(cookieParser())
  app.use(setLocals)

}
