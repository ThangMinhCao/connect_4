const mongoose = require('mongoose');
const Game = mongoose.model('Game');
const User = mongoose.model('User');
const Board = mongoose.model('Board');
const Messages = mongoose.model('Messages');
const uuid = require('shortid');

const boardSize = [7, 6];

const initializeBoard = (colNum, rowNum) => {
  let board = [];
  for (let i = 0; i < rowNum; i++) {
    board.push([]);
    for (let j = 0; j < colNum; j++) {
      board[i].push(0);
    }
  }
  return board;
}

const getAllPublicAvailableGames = async () => {
  return await Game.find({ public: true, ended: false });
}

const createNewRoom = async (request, response) => {
  try {
    const { name, public, password } = request.body.params;

    const creatorID = request.userID;
    if (!creatorID) throw "Missing creator's id.";

    const roomID = uuid.generate();
    await User.findOneAndUpdate({ id: creatorID }, {
      "$addToSet": {
        "currentGames": roomID, 
      }
    }, { useFindAndModify: false }, (err, result) => {
      if (err) throw "Creator's ID not available.";
    });

    const gameRoom = new Game({
      name: !name ? 'Empty name' : name,
      id: roomID,
      owner: { ownerID: creatorID, ownerName: request.username },
      password: !password ? undefined : password,
      players: [{ id: creatorID, username: request.username }],
      currentPlayer: { id: '', username: '' },
      public
    });

    const messages = new Messages({
      id: roomID,
      messages: []
    });

    const newBoard = new Board({
      id: roomID,
      board: initializeBoard(boardSize[0], boardSize[1]),
    })

    await gameRoom.save();
    await newBoard.save();
    await messages.save();
    // console.log(await Board.findOne({id: roomID}));
    const games = await getAllPublicAvailableGames();
    const app = request.app;
    app.get('socketio').emit('allGames', games);
    emitCurrentGames(creatorID, app.get('socketio'));
    response.json({
      message: `Room: '${name}' was created successfully!`
    });
  } catch (err) {
    response.status(400).send({ message: err });
  }
};

const getAllGames = async (request, response) => {
  try {
    const games = await getAllPublicAvailableGames();
    response.json({
      games
    })
    request.app.get('socketio').emit('allGames', games);
  } catch (err) {
    response.status(400).send({ message: err });
  }
};

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

const joinGame = async (request, response) => {
  try {
    const app = request.app;
    const { roomID } = request.body.params;
    const game = await Game.findOne({ id: roomID });
    if (!game) throw 'Game not available!';
    if (game.players.includes(request.userID)) throw 'You are already in this room';

    if (game.players.length === 2) throw 'Game slots are full!';
    await Game.findOneAndUpdate({ _id: game._id }, { "$push": {
      "players": { id: request.userID, username: request.username },
    }}, {useFindAndModify: false})

    await User.findOneAndUpdate({ id: request.userID }, { "$push": {
      "currentGames": roomID,
    }}, {useFindAndModify: false})
    app.get('socketio').emit('allGames', await getAllPublicAvailableGames());

    emitCurrentGames(game.owner.ownerID, app.get('socketio'));
    getGame(request, response);
    response.json({
      message: 'Join game successfully!',
    })
    // request.app.get('socketio').emit('allGames', games);
  } catch (err) {
    response.status(400).send({ message: err });
  }
}

const startGame = async (request, response) => {
  try {
    const { roomID } = request.body.params;
    const foundGame = await Game.findOne({ id: roomID });
    const foundBoard = await Board.findOne({ id: roomID });
    if (!foundGame) throw 'This game doesn\'t exist.';
    if (foundGame.owner.ownerID !== request.userID) throw 'You are not the owner.';
    const randomFirstPlayer = foundGame.players[Math.floor(Math.random() * 2)];
    await Game.updateOne({ id: roomID }, {
      "$set": {
        "currentPlayer": randomFirstPlayer,
        "started": true
      },
    })
    foundGame.started = true;
    foundGame.currentPlayer = randomFirstPlayer;
    request.app.get('socketio').emit(`game#${roomID}`, {
      game: foundGame,
      board: foundBoard.board
    });
    const opponentID = foundGame.players.filter((player) => player.id !== request.userID)[0].id;
    await emitCurrentGames(opponentID, request.app.get('socketio'));
  } catch (err) {
    response.status(400).send({ message: err });
  }
}

const getCurrentGameInfo = async (roomID, socket) => {
  const foundGame = await Game.findOne({ id: roomID });
  const foundBoard = await Board.findOne({ id: roomID });

  if (!foundGame || !foundBoard) return new Error('This game does not exist.');
  socket.emit(`game#${roomID}`, {
    game: foundGame,
    board: foundBoard.board
  });
}

const getGame = async (request, response) => {
  try {
    const { roomID } = request.query; 
    getCurrentGameInfo(roomID, request.app.get('socketio'));
  } catch (err) {
    response.status(400).send({ message: err }); 
  }
}

const getCurrentGames = async (request, response) => {
  try {
    emitCurrentGames(request.userID, request.app.get('socketio'));
  } catch (err) {
    response.status(400).send({ message: err }); 
  }
}

module.exports = {
  createNewRoom,
  getAllGames,
  joinGame,
  startGame,
  getGame,
  getCurrentGames,
};
