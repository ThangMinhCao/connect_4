const mongoose = require('mongoose');
// const Mixed = mongoose.Schema.Types.Mixed;

const boardSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },

  board: {
    type: [[Number]]
  }
});

mongoose.model('Board', boardSchema);
