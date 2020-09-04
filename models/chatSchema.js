const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatSchema = Schema({
  name: String,
  messages: [{type: Schema.Types.ObjectID, ref: 'message'}],
  users: [{type: Schema.Types.ObjectID, ref: 'user'}]
})

module.exports = mongoose.model('chat', chatSchema)
