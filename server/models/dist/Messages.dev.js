"use strict";

var mongoose = require('mongoose');

var messagesSchema = new mongoose.Schema({
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