"use strict";

var express = require('express');

var socketio = require('socket.io');

var http = require('http');

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var cors = require('cors');

var _require = require('./database/mongodb'),
    connectDB = _require.connectDB,
    dbURI = _require.dbURI;

var path = require('path');

var app = express();
var server = http.createServer(app);
var io = socketio(server, {
  transports: ['polling']
});
var PORT = process.env.PORT || 5000;
app.set('socketio', io);
app.get(function (req, res) {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
}); // parse json from request's body

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cors()); // database connection

connectDB(); // models

require('./models/User');

require('./models/Game');

require('./models/Board'); // routes


app.use("/users", require("./routes/userRouter"));
app.use("/games", require("./routes/gameRouter")); // DB config

mongoose.connect(dbURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once('connected', function () {
  console.log('Game\'s database connected to mongoose.');
});
mongoose.connection.on('error', function (err) {
  console.log('Error occurs when connecting to MongoDB: ', err);
});
io.on('connection', function (socket) {
  // console.log('New connection occurs!');
  app.set('socketID', socket.id);
  socket.on('disconnect', function () {// console.log('User left!');
  });
}); //listen

server.listen(PORT, function () {
  return console.log("Server is running on port: http://localhost:".concat(PORT, "/"));
});
io.listen(server);