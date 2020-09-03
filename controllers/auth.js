const bcrypt = require('bcrypt')
const fs = require('fs').promises
const path = require('path')

const User = require('../models/User')
const Data = require('../models/userFaceData')
const registerUserFace = require('../utils/registerUserFace')


module.exports.registerUser = async function(req, res) {
  const {email, username, password, haveVideo} = req.body
  const salt = 10
  const candidate = await User.findOne({email})
  if (candidate) {
    res.status(409).json({
      status: 'redirect',
      success: true,
      message: 'User already exist',
    })
  } else {
    try {
      const secretPassword = bcrypt.hashSync(password, salt)
      const user = new User({
        username,
        email,
        password: secretPassword,
        haveVideo
      })
      await user.save()
      req.session.user = user
      console.log(req.session)
      res.status(201).json({
        status: 'done',
        success: true,
      })
    } catch (e) {
      res.status(409).json({
        status: 'error',
        success: false,
        message: e,
      })
    }
  }
}

module.exports.registerUsersFace = async function(req, res){
  let {dataArray} = req.body
  dataArray = dataArray.map(data => {
    return new Buffer(data.replace(/^data:image\/\w+;base64,/, ""), 'base64')
  })
  await fs.mkdir(path.join(__dirname, '..', `${req.session.user._id}`))
  for (let i = 0; i < dataArray.length; i++) {
    await fs.writeFile(`./${req.session.user._id}/person-${req.session.user._id}-${i}.png`, dataArray[i])
  }
  const result = await registerUserFace(req.session.user.username, req.session.user._id)
  await new Data({
    user_id: req.session.user._id,
    data: result
  }).save()
  await fs.rmdir(path.join(__dirname, '..', `${req.session.user._id}`), {recursive: true})
  res.json({status: 'ok'})
}

module.exports.loginUser = async function(req, res) {
  const {email, password} = req.body
  try {
    const candidate = await User.findOne({email})
    if (candidate) {
      if (bcrypt.compareSync(password, candidate.password)) {
        req.session.user = candidate
        res.status(200).json({
          success: true,
          status: 'done',
        })
      } else {
        res.status(409).json({
          success: false,
          status: 'password',
          message: 'Password is incorrect'
        })
      }
    } else {
      res.status(404).json({
        success: false,
        status: 'user',
        message: 'User is not found please check email'
      })
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      status: 'error',
      message: e
    })
  }
}

module.exports.loginUserFace = async function(req, res){

}

module.exports.logoutUser = async function(req, res) {
  req.session.destroy()
  res.clearCookie('user_sid')
  res.redirect('/')
}
