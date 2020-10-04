const mongoose = require('mongoose');
const Game = mongoose.model('Game');
const User = mongoose.model('User');
const Board = mongoose.model('Board');
const uuid = require('shortid');

const boardSize = [7, 6];

const move = (board, column, playerCode) => {
  for (let i = boardSize[1] - 1; i >= 0; i--) {
    if (board[i][column] === 0) {
      board[i][column] = playerCode;
      return true;
    }
  }
  return false;
}

const playAMove = async (request, response) => {
  try {
    const { roomID, column } = request.body.params;
    const playerID = request.userID;
    const foundBoard = await Board.findOne({ id: roomID });
    if (!foundBoard) throw 'Board not available.';
    const foundGame = await Game.findOne({ id: roomID });
    if (!foundGame.started) throw 'This game is not started yet!';
    const playerCode = foundGame.players.indexOf(playerID) + 1;

    const newBoard = foundBoard.board;
    if (!move(newBoard, column, playerCode)){
      response.json({
        message: "That column is full.",
      })
      return;
    }

    await Board.updateOne({ id: roomID }, {
      "$set" : { "board": newBoard }
    })

    const updatedGame = await Game.findOneAndUpdate({ id: roomID }, {
      "$inc": { "movesOccured": 1 }
    })
    request.app.get('socketio').emit(`game#${roomID}`, {
      game: updatedGame, 
      board: newBoard
    });

    response.json({
      message: "Played successfully.", 
    })
  } catch (err) {
    response.status(400).send(err); 
  }
}

module.exports = {
  playAMove,
};
