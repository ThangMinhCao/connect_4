const jwt = require('jsonwebtoken');
const SECRET = require('../constants/secret');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const verifyToken = (request, response, next) => {
  const token = request.headers.token;
  if (!token) {
    return response.status(403).json({
      message: "Missing token!",
    });
  };
  jwt.verify(token, SECRET, async (err, decodedToken) => {
    if (err || !await User.findOne({ id: decodedToken.id })) {
      return response.send({
        error: 'Invalid token!',
      });
    };
    request.userID = decodedToken.id;
    request.username = decodedToken.username;
    next();
  });
};

module.exports = {
  verifyToken
};
