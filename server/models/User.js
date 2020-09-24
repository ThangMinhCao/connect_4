const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  
  id: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
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
