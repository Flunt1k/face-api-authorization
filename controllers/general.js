module.exports.getWelcomePage = function(req, res){
  res.render('welcome-page')
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

module.exports.getChatRoomPage =function(req,res){
  res.render('chat-room-page')
}
