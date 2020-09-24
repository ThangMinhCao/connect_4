const mongoose = require('mongoose');
const GameRoom = mongoose.model('GameRoom');
const User = mongoose.model('User');
const uuid = require('shortid');

exports.createNewRoom = async (request, response) => {
  try {
    const { name, password } = request.body;

    const creatorID = request.payload.id;
    if (!creatorID) throw "Missing creator's id.";

    const foundUser = await User.findOne({ id: creatorID });
    if (!foundUser) {
      throw "Creator's ID not available.";
    }

    const gameRoom = new GameRoom({
      name: !name ? 'Empty name' : name,
      id: uuid.generate(),
      owner: creatorID,
      password: !password ? undefined : password,
    });
    // await gameRoom.save();
    response.json({
      message: `Room '${name}' was created successfully!`
    })
  } catch (err) {
    console.log("Error occurs: ", err);
    response.status(401).send(err);
  }
}