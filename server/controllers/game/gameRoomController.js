const mongoose = require('mongoose');
const Game = mongoose.model('Game');
const User = mongoose.model('User');
const uuid = require('shortid');

const createNewRoom = async (request, response) => {
  try {
    const { name, password } = request.body.params;

    const creatorID = request.userID;
    if (!creatorID) throw "Missing creator's id.";

    const foundUser = await User.findOne({ id: creatorID });
    if (!foundUser) {
      throw "Creator's ID not available.";
    };

    const gameRoom = new Game({
      name: !name ? 'Empty name' : name,
      id: uuid.generate(),
      owner: foundUser.username,
      password: !password ? undefined : password,
      players: {
        player1: foundUser.username,
        player2: '',
      } 
    });
    await gameRoom.save();

    const games = await Game.find();
    request.app.get('socketio').emit('allGames', games);
    response.json({
      message: `Room: '${name}' was created successfully!`
    });
  } catch (err) {
    response.status(401).send(err);
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
    // if (Game.find({ players: request.userID })) throw 'You are already in this room';

    if (game.players.length === 2) throw 'Game slots are full!';
    Game.findByIdAndUpdate(game._id, { $set: {
      'players.player2': request.userID,
    }})

    response.json({
      message: 'Join game successfully!',
    })
    // request.app.get('socketio').emit('allGames', games);
    // request.app.get('socketio').broadcast.emit('allGames', games);
  } catch (err) {
    response.status(404).send(err);
  }
}

module.exports = {
  createNewRoom,
  getAllGames,
  joinGame,
};
