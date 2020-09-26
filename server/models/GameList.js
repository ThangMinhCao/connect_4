const mongoose = require('mongoose');
// const Mixed = mongoose.Schema.Types.Mixed;

const roomListSchema = new mongoose.Schema({
  list: {
    type: [String],
    default: [],
    required: true,
  }
});

mongoose.model('GameList', roomListSchema);
