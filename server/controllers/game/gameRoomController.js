const mongoose = require('mongoose');
const Game = mongoose.model('Game');
const User = mongoose.model('User');
const uuid = require('shortid');

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
    await gameRoom.save();
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
    const games = await Game.find();
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
    const { gameID } = request.body.params;
    const game = await Game.findOne({ id: gameID });
    if (!game) throw 'Game not available!';
    if (game.players.includes(request.userID)) throw 'You are already in this room';

    if (game.players.length === 2) throw 'Game slots are full!';
    await Game.findOneAndUpdate({ _id: game._id }, { "$push": {
      "players": request.userID,
    }})

    await User.findOneAndUpdate({ id: request.userID }, { "$push": {
      "currentGames": gameID,
    }})

    response.json({
      message: 'Join game successfully!',
    })
    request.app.get('socketio').emit('allGames', games);
    // request.app.get('socketio').broadcast.emit('allGames', games);
  } catch (err) {
    response.status(400).send(err);
  }
}

module.exports = {
  createNewRoom,
  getAllGames,
  joinGame,
};
