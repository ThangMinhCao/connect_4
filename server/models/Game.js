const mongoose = require('mongoose');
// const Mixed = mongoose.Schema.Types.Mixed;

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  public: {
    type: Boolean,
    default: false, 
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
    default: false,
  },

  currentPlayer: {
    type: String,
  },

  movesOccured: {
    type: Number,
    default: 0,
  }
});

mongoose.model('Game', gameSchema);
