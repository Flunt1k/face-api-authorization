const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = Schema({
  username: {type: String, required:true, unique: true},
  email: {type: String},
  password: String,
  haveVideo: Boolean,
})

module.exports = mongoose.model('user', userSchema)
