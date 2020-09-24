const mongoose = require('mongoose');
const Mixed = mongoose.Schema.Types.Mixed;

const ingameBoardListSchema = new mongoose.Schema({
  boardList: {
    boards: {
      id: String,
      board: [Array],
    },
    required: true,
  },

  messages: {
    type: Array,
    required: true,
  },
});

mongoose.model('IngameBoardList', ingameBoardListSchema);
