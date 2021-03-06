const mongoose = require('mongoose');
const User = mongoose.model('User');
const { Base64 } = require('js-base64');
const jwt = require('jsonwebtoken');
const SECRET = require('../../constants/secret');
const uuid = require('shortid');

const signup = async (request, response) => {
  try {
    const { username, public, password } = request.body;
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

    await User.updateOne({ id: user.id }, {
      "$set": {
        "online": true,
      }
    })

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
    request.app.get('socketio').emit('allUsers', users);
    response.json({
      message: "Get all user successfully!"
    })
  } catch (err) {
    response.status(400).send(err);
  }
}

const getFriendList = async (request, response) => {
  try {
    const userID = request.userID;
    const user = await User.findOne({ id: userID });
    const friendList = await User.find({
      'id': { "$in": user.friends }
    });
    request.app.get('socketio').emit(`friendList#${userID}`, friendList);
    response.json({
      message: "Get friend list successfully!"
    })
  } catch (err) {
    response.status(400).send(err);
  }
}

const getFriendRequests = async (request, response) => {
  try {
    const userID = request.userID;
    const user = await User.findOne({ id: userID });
    const requests = await User.find({
      'id': { "$in": user.comingFriendRequests }
    });
    request.app.get('socketio').emit(`friendRequests#${userID}`, requests);
    response.json({
      message: "Get friend requests successfully!"
    })
  } catch (err) {
    response.status(400).send(err);
  }
}

const getUserFromToken = async (request, response) => {
  try {
    await User.updateOne({ id: request.userID }, {
      "$set": {
        online: true,
      }
    })
    response.json({
      username: request.username,
      id: request.userID,
    })
  } catch (err) {
    response.status(400).send(err);
  }
}

const logout = async (request, response) => {
  try {
    await User.updateOne({ id: request.userID }, {
      "$set": {
        online: false,
      }
    })
    response.json({
      message: "Logout successfully!"
    })
  } catch (err) {
    response.status(400).send(err);
  }
}

const sendFriendRequest = async (request, response) => {
  try {
    const { targetID } = request.body;
    const userID = request.userID;
    const target = await User.findOne({ id: targetID });

    if (userID === targetID
      || target.friends.includes(userID)
      ||target.comingFriendRequests.includes(userID)) {
      throw "Bad friend request call.";
    }
    await User.updateOne({ id: targetID }, {
      "$push": {
        "comingFriendRequests": userID,
      }
    })

    await User.updateOne({ id: userID }, {
      "$push": {
        "sentFriendRequests": targetID,
      }
    })

    const targetRequests = await User.find({
      'id': { "$in": [...target.comingFriendRequests, userID] }
    });
    request.app.get('socketio').emit(`friendRequests#${targetID}`, targetRequests);

    const users = (await User.find()).filter((user) => user.public);
    request.app.get('socketio').emit('allUsers', users);
    response.json({
      message: "Friend request sent!"
    })
  } catch (err) {
    response.status(400).send({
      message: err
    });
  }
}

const acceptFriendRequest = async (request, response) => {
  try {
    const { targetID } = request.body;
    const userID = request.userID;

    await User.updateOne({ id: targetID }, {
      "$pull": {"sentFriendRequests": userID},
      "$push": {"friends": userID}
    })

    await User.updateOne({ id: userID }, {
      "$pull": {"comingFriendRequests": targetID},
      "$push": {"friends": targetID}
    })

    getFriendList(request, response);
    const user = await User.findOne({ id: userID });
    const requests = await User.find({
      'id': { "$in": user.comingFriendRequests }
    });
    request.app.get('socketio').emit(`friendRequests#${userID}`, requests);
    const users = (await User.find()).filter((user) => user.public);
    request.app.get('socketio').emit('allUsers', users);
  } catch (err) {
    response.status(400).send(err);
  }
}

const rejectFriendRequest = async (request, response) => {
  try {
    const { targetID } = request.body;
    const userID = request.userID;

    await User.updateOne({ id: targetID }, {
      "$pull": {"sentFriendRequests": userID},
    })

    await User.updateOne({ id: userID }, {
      "$pull": {"comingFriendRequests": targetID},
    })

    getFriendRequests(request, response);
    const users = (await User.find()).filter((user) => user.public);
    request.app.get('socketio').emit('allUsers', users);
  } catch (err) {
    response.status(400).send(err);
  }
}

const cancelFriendRequest = async (request, response) => {
  try {
    const { targetID } = request.body;
    const userID = request.userID;

    await User.updateOne({ id: targetID }, {
      "$pull": {"comingFriendRequests": userID},
    })

    await User.updateOne({ id: userID }, {
      "$pull": {"sentFriendRequests": targetID},
    })

    const users = (await User.find()).filter((user) => user.public);
    request.app.get('socketio').emit('allUsers', users);
    response.json({
      message: "Friend request cancelled!",
    })
  } catch (err) {
    response.status(400).send(err);
  }
}

const unfriend = async (request, response) => {
  try {
    const { targetID } = request.body;
    const userID = request.userID;

    await User.updateOne({ id: targetID }, {
      "$pull": {"friends": userID},
    })

    await User.updateOne({ id: userID }, {
      "$pull": {"friends": targetID},
    })

    getFriendList(request, response);
    const target = await User.findOne({ 'id': targetID });
    const targetFriendList = await User.find({
      'id': { "$in": target.friends }
    });
    request.app.get('socketio').emit(`friendList#${targetID}`, targetFriendList);
    const users = (await User.find()).filter((user) => user.public);
    request.app.get('socketio').emit('allUsers', users);
  } catch (err) {
    response.status(400).send(err);
  }
}

module.exports = {
  signup,
  login,
  logout,
  getAllUsers,
  getUserFromToken,
  getFriendList,
  getFriendRequests,
  sendFriendRequest,
  acceptFriendRequest,
  cancelFriendRequest,
  rejectFriendRequest,
  unfriend,
}
