const { Message } = require('@material-ui/icons');
const mongoose = require('mongoose');
const Game = mongoose.model('Game');
const User = mongoose.model('User');
const Board = mongoose.model('Board');
const Messages = mongoose.model('Messages');
const uuid = require('shortid');

const boardSize = [7, 6];

const move = (board, column, playerCode) => {
  for (let i = boardSize[1] - 1; i >= 0; i--) {
    if (board[i][column] === 0) {
      board[i][column] = playerCode;
      return { successful: true, position: [i, column] };
    }
  }
  return { successful: false, position: null };
}

const emitCurrentGames = async (userID, socket) => {
  const foundUser = await User.findOne({ id: userID });
  const ownerCurrentGameIDs = foundUser.currentGames;
  const ownerCurrentGames = await Game.find({
    "id": {
      "$in": ownerCurrentGameIDs,
    }
  })
  socket.emit(`currentGames#${userID}`, ownerCurrentGames);
};

const checkVertical = (board, i, j, playerCode) => {
  let discNum = 0;
  for (let r = i; r >= 0; r--) {
    if (board[r][j] !== playerCode) {
      break;
    }
    discNum++;
  }
  for (let r = i; r < board.length; r++) {
    if (board[r][j] !== playerCode) {
      break;
    }
    discNum++;
  }
  return discNum - 1 >= 4;
}

const checkHorizontal = (board, i, j, playerCode) => {
  let discNum = 0;
  for (let c = j; c >= 0; c--) {
    if (board[i][c] !== playerCode) {
      break;
    }
    discNum++;
  }
  for (let c = j; c < board[0].length; c++) {
    if (board[i][c] !== playerCode) {
      break;
    }
    discNum++;
  }
  return discNum - 1 >= 4;
}

const checkDiagonalTopRight = (board, i, j, playerCode) => {
  let discNum = 0;
  let [upI, downI, rightJ, leftJ] = [i, i, j, j];
  while (upI >= 0 && rightJ < board[0].length && board[upI][rightJ] === playerCode) {
     discNum++;
     upI--;
     rightJ++;
  }
  while (downI < board.length && leftJ >= 0 && board[downI][leftJ] === playerCode) {
     discNum++;
     downI++;
     leftJ--;
  }
  return discNum - 1 >= 4;
}
const checkDiagonalTopLeft = (board, i, j, playerCode) => {
  let discNum = 0;
  let [upI, downI, rightJ, leftJ] = [i, i, j, j];
  while (upI >= 0 && leftJ >= 0 && board[upI][leftJ] === playerCode) {
     discNum++;
     upI--;
     leftJ--;
  }
  while (downI < board.length && rightJ < board[0].length && board[downI][rightJ] === playerCode) {
     discNum++;
     downI++;
     rightJ++;
  }
  return discNum - 1 >= 4;
}

const checkGameEnd = (board, lastMovePosition) => {
  const [i, j] = lastMovePosition; 
  const lastMoveCode = board[i][j];
  return checkVertical(board, i, j, lastMoveCode)
      || checkHorizontal(board, i, j, lastMoveCode)
      || checkDiagonalTopLeft(board, i, j, lastMoveCode)
      || checkDiagonalTopRight(board, i, j, lastMoveCode);
}

const checkFullBoard = (board) => {
  return !board.some(row => row.includes(0));
}

const playAMove = async (request, response) => {
  try {
    const { roomID, column } = request.body.params;
    const playerID = request.userID;
    const foundBoard = await Board.findOne({ id: roomID });
    if (!foundBoard) throw 'Board not available.';
    const foundGame = await Game.findOne({ id: roomID });
    if (!foundGame.started) throw 'This game is not started yet!';

    const playerCode = foundGame.players.map(p => p.id).indexOf(playerID) + 1;

    const newBoard = foundBoard.board;
    const lastMove = move(newBoard, column, playerCode);
    if (!lastMove.successful){
      response.json({
        message: "That column is full.",
      })
      return;
    }

    await Board.updateOne({ id: roomID }, {
      "$set" : { "board": newBoard }
    })

    const opponent = foundGame.players.filter(player => player.id !== playerID)[0];
    const updatedGame = await Game.findOneAndUpdate({ id: roomID }, {
      "$inc": { "movesOccured": 1 },
      "$set": { "currentPlayer": opponent }
    }, {useFindAndModify: false, new: true})
    const socket = request.app.get('socketio');
    emitCurrentGames(opponent.id, socket)

    if (checkFullBoard(newBoard)) {
      await Game.updateOne({ id: roomID }, {
        "$set": {
          "ended": true,
        }
      })
      updatedGame.ended = true;
    } else if (checkGameEnd(newBoard, lastMove.position)) {
      await Game.updateOne({ id: roomID }, {
        "$set": {
          "ended": true,
          "winner": playerID
        }
      })
      updatedGame.ended = true;
      updatedGame.winner = playerID;
      await User.update({ id: playerID }, {
        "$inc": { wins: 1 }
      })

      await User.update({ id: opponent.id }, {
        "$inc": { loses: 1 }
      })
    }
    if (updatedGame.ended) {
      await User.updateMany({ currentGames: roomID }, {
        "$pull": { currentGames: roomID },
        "$push": { gameHistory: updatedGame }
      })
    }

    socket.emit(`game#${roomID}`, {
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

const getMessages = async (request, response) => {
  try {
    const { roomID } = request.query;
    const messages = await Messages.findOne({ id: roomID });
    if (!messages) throw 'The room doesn\'t exist';
    const socket = request.app.get('socketio');
    socket.emit(`messages#${roomID}`, {
      messages: messages.messages
    });
    response.json({
      message: "Get messages successfully",
    })
  } catch (err) {
    response.status(400).send(err); 
  }
}

const sendMessage = async (request, response) => {
  try {
    const { roomID, message } = request.body;
    const userID = request.userID;

    const messages = await Messages.findOneAndUpdate({ id: roomID }, {
      "$push": {
        messages: {
          sender: userID,
          content: message
        }
      }
    }, { useFindAndModify: false, new: true })
    const socket = request.app.get('socketio');
    socket.emit(`messages#${roomID}`, {
      messages: messages.messages
    });
    response.json({
      message: "Sent message successfully",
    })
  } catch (err) {
    response.status(400).send(err); 
  }
}

module.exports = {
  playAMove,
  getMessages,
  sendMessage
};
