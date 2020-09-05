const Chat = require('../models/chatSchema')
const Message = require('../models/Message')

module.exports.listen = function(io) {
  io.on('connection', socket => {
    const session = socket.request.session
    socket.on('userConnected',async (id) => {
      const currentChat = await Chat.findOne({_id: id})
      console.log(currentChat)
      console.log(currentChat.users.includes(session.user._id.toString()))
      if (!currentChat.users.includes(session.user._id)) currentChat.users.push(session.user._id)
      console.log(currentChat)
      await currentChat.populate('users').execPopulate()
      console.log(currentChat)
      await currentChat.save()
    io.emit('addUserToList', currentChat.users)
    })

    console.log('user connected')
    socket.broadcast.emit('userConnected', session.user.username)

    socket.on('message', async (message, idRoom) => {
      const newMsg =new Message({
        message,
        sender: session.user._id
      })
      await newMsg.save()
      const currentChat = await Chat.findOne({_id: idRoom})
      currentChat.messages.push(newMsg._id)
      await currentChat.save()
      socket.broadcast.emit('message', message)
    })

    socket.on('userDisconnect',async (id) => {
      const currentChat =await Chat.findOne({_id: id})
      console.log(typeof session.user._id)
      console.log(currentChat.users.indexOf(session.user._id.toString()))
      currentChat.users.splice(currentChat.users.indexOf(session.user._id), 1)
      await currentChat.save()
      socket.broadcast.emit('deleteUserFromList', session.user._id)
    })
  })
}
