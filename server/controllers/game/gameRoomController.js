const mongoose = require('mongoose');
const Game = mongoose.model('Game');
const User = mongoose.model('User');
const Board = mongoose.model('Board');
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

const createNewRoom = async (request, response) => {
  try {
    const { name, public, password } = request.body.params;

    const creatorID = request.userID;
    if (!creatorID) throw "Missing creator's id.";

    const foundUser = await User.findOne({ id: creatorID });
    if (!foundUser) {
      throw "Creator's ID not available.";
    };

    const roomID = uuid.generate();
    const gameRoom = new Game({
      name: !name ? 'Empty name' : name,
      id: roomID,
      owner: { ownerID: creatorID, ownerName: request.username },
      password: !password ? undefined : password,
      players: [creatorID],
      currentGames: [roomID],
      public
    });

    const newBoard = new Board({
      id: roomID,
      board: initializeBoard(boardSize[0], boardSize[1]),
    })

    await gameRoom.save();
    await newBoard.save();
    // console.log(await Board.findOne({id: roomID}));
    const games = await Game.find();
    request.app.get('socketio').emit('allGames', games);
    response.json({
      message: `Room: '${name}' was created successfully!`
    });
  } catch (err) {
    response.status(400).send(err);
  }
};

const getAllGames = async (request, response) => {
  try {
    const games = await Game.find({ public: true });
    response.json({
      games
    })
    request.app.get('socketio').emit('allGames', games);
    // request.app.get('socketio').broadcast.emit('allGames', games);
  } catch (err) {
    response.status(400).send(err);
  }
};

const joinGame = async (request, response) => {
  try {
    const { roomID } = request.body.params;
    const game = await Game.findOne({ id: roomID });
    if (!game) throw 'Game not available!';
    if (game.players.includes(request.userID)) throw 'You are already in this room';

    if (game.players.length === 2) throw 'Game slots are full!';
    await Game.findOneAndUpdate({ _id: game._id }, { "$push": {
      "players": request.userID,
    }}, {useFindAndModify: false})

    await User.findOneAndUpdate({ id: request.userID }, { "$push": {
      "currentGames": roomID,
    }}, {useFindAndModify: false})

    response.json({
      message: 'Join game successfully!',
    })
    // request.app.get('socketio').emit('allGames', games);
    // request.app.get('socketio').broadcast.emit('allGames', games);
  } catch (err) {
    response.status(400).send(err);
  }
}

const startGame = async (request, response) => {
  try {
    const { roomID } = request.body.params;
    const foundGame = await Game.findOne({ id: roomID })
    if (!foundGame) throw 'This game doesn\'t exist.';
    await Game.updateOne({ id: roomID }, {
      "$set": { "currentPlayer": foundGame.players[Math.floor(Math.random() * 2)]}
    })
    request.app.get('socketio').emit(`game#${roomID}`, foundGame);
  } catch (err) {
    response.status(400).send(err);
  }
}

const getGame = async (request, response) => {
  try {
    const { roomID } = request.query; 
    const foundGame = await Game.findOne({ id: roomID });
    const foundBoard = await Board.findOne({ id: roomID });

    if (!foundGame || !foundBoard) throw 'This game does not exist.';
    request.app.get('socketio').emit(`game#${roomID}`, {
      game: foundGame,
      board: foundBoard.board
    });
  } catch (err) {
    response.status(400).send(err); 
  }
}

module.exports = {
  createNewRoom,
  getAllGames,
  joinGame,
  startGame,
  getGame,
};
