const mongoose = require('mongoose');

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
    type: String,
  }],

  currentGames: [{
    // array of room id
    type: String,
  }],

  friends: [{
    // array of user id
    type: String,
  }],
},
{
  timestamps: true,
});

mongoose.model('User', userSchema);
