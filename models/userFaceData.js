const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dataSchema = Schema({
  user_id: {type: Schema.Types.ObjectID, ref: 'user', unique: true},
  data: Object
})

module.exports = mongoose.model('face-data', dataSchema)
