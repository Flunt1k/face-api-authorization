const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema(
    {
      message: {
        type: String,
      },
      sender: {type: Schema.Types.ObjectID, ref: 'user'},
    })

module.exports = mongoose.model('message', messageSchema)
