const Chat = require('../models/chatSchema')
const Message = require('../models/Message')

module.exports.getWelcomePage =async function(req, res){
  const chats = await Chat.find({})
  res.render('welcome-page', {chats})
}

module.exports.getRegistrationPage = function(req, res){
  res.render('registration-page')
}

module.exports.getRegistrationFacePage = function(req, res){
  res.render('registration-face-page')
}

module.exports.getRegistrationDefaultPage = function(req, res){
  res.render('registration-default-page')
}

module.exports.getFaceRecordingPage = function(req, res){
  res.render('face-recording-page')
}

module.exports.getLoginPage = function(req, res){
  res.render('login-page')
}

module.exports.getFaceLoginPage = function(req, res){
  res.render('login-face-page')
}

module.exports.getChatRoomPage = async function(req,res){
  const param = req.params.id
  const chat = await Chat.findOne({_id: param})
await chat.populate('users').execPopulate()
await chat.populate('messages').execPopulate()
  const users = chat.users
  const chatMessages = chat.messages
  res.render('chat-room-page', {param, users, chatMessages})
}

module.exports.getGeneratorChatPage = function(req, res){
  res.render('create-chat-page')
}
