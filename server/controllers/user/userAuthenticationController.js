const mongoose = require('mongoose');
const User = mongoose.model('User');
const {Base64} = require('js-base64');
const jwt = require('jsonwebtoken');
const SECRET = require('../../constants/secret');
const uuid = require('shortid');

exports.signup = async (request, response) => {
  try {
    const { username, password } = request.body;
    //TODO encode password
    const availableUser = await User.findOne({ username: Base64.decode(username) });
    if (availableUser) {
      throw 'Given username is already taken.';
    }
    const user = new User({
      username: Base64.decode(username),
      //this password is encoded with base64
      password: password,
      id: uuid.generate(),
      gameHistory: [],
      currentGames: [],
    });
    await user.save();

    response.json({
      message: `${Base64.decode(username)} signed up successfully!`,
    })
  } catch (err) {
    // console.log("Error occurs: ", err);
    response.send({
      error: true,
      message: err,
    });
  }
}

exports.login = async (request, response) => {
  try {
    const { username, password } = request.body;
    // encoded password using base64 from client
    const user = await User.findOne({
      username: Base64.decode(username),
      password: password,
    });

    if (!user) {
      throw 'Username or password does not exist. Please try again.';
    }

    const userToken = jwt.sign({ id: user.id }, SECRET);
    response.json({
      message: `${Base64.decode(username)} logged in successfully!`,
      userToken,
    });
  } catch (err) {
    response.send({
      error: true,
      message: err,
    });
  }
}
