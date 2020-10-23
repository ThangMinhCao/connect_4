const mongoose = require('mongoose');

const messagesSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },

  messages: [{
    sender: String,
    content: String
  }]

});

mongoose.model('Messages', messagesSchema);
