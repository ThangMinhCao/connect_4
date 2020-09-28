const mongoose = require('mongoose');
const User = mongoose.model('User');
const { Base64 } = require('js-base64');
const jwt = require('jsonwebtoken');
const SECRET = require('../../constants/secret');
const uuid = require('shortid');

const signup = async (request, response) => {
  try {
    const { username, public, password } = request.body;
    //TODO encode password
    const availableUser = await User.findOne({ username: username });
    if (availableUser) {
      throw 'Given username is already taken.';
    };

    const user = new User({
      username: username,
      //this password is encoded with base64
      password: Base64.decode(password),
      id: uuid.generate(),
      gameHistory: [],
      currentGames: [],
      public,
    });
    await user.save();

    response.json({
      message: `${username} signed up successfully!`,
    });
  } catch (err) {
    response.send({
      error: err,
    });
  }
}

const login = async (request, response) => {
  try {
    const { username, password } = request.body;
    // encoded password using base64 from client
    const userWithoutPwd = await User.findOne({
      username: username,
    });
    if (!userWithoutPwd) {
      throw 'Username does not exist.';
    };

    const user = await User.findOne({
      username: username,
      password: Base64.decode(password),
    });

    if (!user) {
      throw 'Username and password does not match.';
    };

    const token = jwt.sign({ id: user.id, username }, SECRET);
    response.json({
      message: `${username} logged in successfully!`,
      username,
      id: user.id,
      token,
    });
  } catch (err) {
    response.send({
      // make this like mongodb error to easier handle
      error: err,
    });
  }
}

const getAllUsers = async (request, response) => {
  try {
    const users = (await User.find()).filter((user) => user.public);
    response.json({
      users,
    })
  } catch (err) {
    response.status(400).send(err);
  }
}

const getUserFromToken = (request, response) => {
  try {
    response.json({
      username: request.username,
      id: request.userID,
    })
  } catch (err) {
    response.status(400).send(err);
  }
}

module.exports = {
  signup,
  login,
  getUserFromToken,
}
