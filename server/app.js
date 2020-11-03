const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectDB, dbURI } = require('./database/mongodb');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketio(server, { transports: ['polling'] }); 

const PORT = process.env.PORT || 5000;

app.set('socketio', io);
app.get((req, res) => {
  res.sendFile(path.resolve(__dirname, '../build' , 'index.html'));
});

// parse json from request's body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// database connection
connectDB();

// models
require('./models/User');
require('./models/Game');
require('./models/Board');
require('./models/Messages');

// routes
app.use("/users", require("./routes/userRouter"));
app.use("/games", require("./routes/gameRouter"));

// DB config
mongoose.connect(dbURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('connected', () => {
  console.log('Game\'s database connected to mongoose.');
});

mongoose.connection.on('error', (err) => {
  console.log('Error occurs when connecting to MongoDB: ', err);
});

io.on('connection', (socket) => {
  // console.log('New connection occurs!');
  app.set('socketID', socket.id);
  socket.on('disconnect', () => {
    // console.log('User left!');
  })
});

//listen
app.get((req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

server.listen(PORT, () => console.log(`Server is running on port: http://localhost:${PORT}/`));
io.listen(server);
