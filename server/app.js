const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectDB, dbURI } = require('./database/mongodb');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// database connection
connectDB();

// app config
const PORT = process.env.PORT || 4000;

// const io = socketio(sever);

// models
require('./models/User');
require('./models/GameRoom');

// routes
app.use("/user", require("./routes/userRouter"));
app.use("/game", require("./routes/gameRoomRouter"));

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

// io.on('connection', (socket) => {
//   console.log('New connection occurs!');

//   socket.on('disconnect', () => {
//     console.log('User left!');
//   })
// });

//listen
const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server is running on port: http://localhost:${PORT}/`));

