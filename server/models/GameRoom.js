const mongoose = require('mongoose');
const Mixed = mongoose.Schema.Types.Mixed;

const gameRoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  
  id: {
    type: String,
    required: true,
  },

  owner: {
    type: String,
    required: true,
  },

  players: [{
    type: String,
  }],

  password: {
    type: String,
  },

  started: {
    type: Boolean,
  },

  currentPlayer: {
    type: String,
  },

  movesOccured: {
    type: Number,
    default: 0,
  }
});

mongoose.model('GameRoom', gameRoomSchema);
