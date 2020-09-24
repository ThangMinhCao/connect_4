const jwt = require('jsonwebtoken');
const SECRET = require('../constants/secret');

module.exports = async (request, response, next) => {
  try {
    if (!request.headers.authorization) {
      throw "Missing token."
    }
    const token = request.headers.authorization.split(" ")[1];
    const payload = await jwt.verify(token, SECRET);
    request.payload = payload;
    next();
  } catch (error) {
    response.status(403).json({
      message: "Forbidden. Failed to authorized.",
    })
  }
}
