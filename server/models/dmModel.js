const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const directMessageSchema = new Schema({
  dm_id: {
    type: Number,
    require: true
  },
  user_from_name: {
    type: String,
    required: true
  },
  user_to_name: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const DirectMessage = mongoose.model('DirectMessage', directMessageSchema);

module.exports = DirectMessage;