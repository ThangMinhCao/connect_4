const jwt = require('jsonwebtoken');
const SECRET = require('../constants/secret');

const verifyToken = (request, response, next) => {
  const token = request.body.headers.token
  if (!token) {
    return response.status(403).json({
      message: "Missing token!",
    });
  };
  jwt.verify(token, SECRET, (err, decodedToken) => {
    if (err) {
      return response.status(401).send({
        error: 'Invalid token!',
      });
    };
    request.userID = decodedToken.id;
    next();
  });
};


module.exports = {
  verifyToken
};
