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
      players: [creatorID]
    });
    await gameRoom.save();
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
  } catch (err) {
    response.status(400).send(err);
  }
};

module.exports = {
  createNewRoom,
  getAllGames,
};
