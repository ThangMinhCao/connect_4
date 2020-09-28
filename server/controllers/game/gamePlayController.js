const mongoose = require('mongoose');
const Game = mongoose.model('Game');
const User = mongoose.model('User');
const Board = mongoose.model('User');
const uuid = require('shortid');

const getBoard = async (request, response) => {
  try {
    const { roomID } = request.body.params;
    const board = await Board.findOne({ id: roomID });
    if (!board) {
      throw 'Board not available.';
    }


    request.app.get('socketio').emit('allGames', games);
    // request.app.get('socketio').broadcast.emit('allGames', games);
  } catch (err) {
    response.status(400).send(err);
  }
};

module.exports = {
  createNewRoom,
  getAllGames,
};
