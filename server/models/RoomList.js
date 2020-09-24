const mongoose = require('mongoose');
const GameRoom = require('./GameRoom');
// const Mixed = mongoose.Schema.Types.Mixed;

const roomListSchema = new mongoose.Schema({
  list: {
    type: [GameRoom],
    default: [],
    required: true,
  }
});

mongoose.model('RoomList', roomListSchema);
