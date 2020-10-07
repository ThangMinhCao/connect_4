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
    type: {
      ownerName: String,
      ownerID: String,
    },
    required: true,
  },

  players: [{
    id: String,
    username: String,
  }],

  password: {
    type: String,
  },

  started: {
    type: Boolean,
    default: false,
  },

  currentPlayer: {
    type: Object,
    default: {
      id: '',
      username: '',
    }
  },

  ended: {
    type: Boolean,
    default: false,
  },

  winner: {
    type: String,
    default: '',
  },

  movesOccured: {
    type: Number,
    default: 0,
  }
});

mongoose.model('Game', gameSchema);
