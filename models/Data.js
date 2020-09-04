const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dataSchema = Schema({
  data: Array,
  user_id: {type: Schema.Types.ObjectID, ref: 'user'}
})

module.exports = mongoose.model('data', dataSchema)
