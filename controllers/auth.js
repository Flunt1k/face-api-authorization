const User = require('../models/User')
const bcrypt = require('bcrypt')

module.exports.registerUser = async function(req, res) {
  const {email, username, password} = req.body
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
        haveVideo: false
      })
      await user.save()
      req.session.user = user
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

module.exports.logoutUser = async function(req, res) {
  req.session.destroy()
  res.clearCookie('user_sid')
  res.redirect('/')
}
