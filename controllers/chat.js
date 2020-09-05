const Chat = require('../models/chatSchema')

module.exports.createChat =async function(req ,res){
  const {chat} = req.body
  try{
    const newChat = new Chat({
      name: chat,
      messages: [],
      users: [],
    })
    await newChat.save()
    res.json({
      status: true,
      room_id: newChat._id
    })
  }catch (e) {
    console.log(e)
    res.json({
      status: false,
      message: e
    })
  }
}
