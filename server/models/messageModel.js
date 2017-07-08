const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  event_id: {
    type: Number,
    required: true
  },
  user_name: {
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

const Message = mongoose.model('Message', messageSchema)

module.exports = Message;