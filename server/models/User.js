const mongoose = require('mongoose');
const Mixed = mongoose.Schema.Types.Mixed;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  
  id: {
    type: String,
    required: true,
  },

  online: {
    type: Boolean,
    default: false,
  },

  public: {
    type: Boolean,
    default: true,
  },

  password: {
    type: String,
    required: true,
    trim: true,
  },

  gameHistory: [{
    // array of room id
    type: Mixed,
  }],

  currentGames: [String],

  // array of user id
  friends: [String],

  comingFriendRequests: [String],
  sentFriendRequests: [String],

  wins: {
    type: Number,
    default: 0,
  },

  loses: {
    type: Number,
    default: 0,
  }
});

mongoose.model('User', userSchema);
