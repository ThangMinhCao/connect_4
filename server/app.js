const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectDB, dbURI } = require('./database/mongodb');

const app = express();
const server = http.createServer(app);
const io = socketio(server); 

const PORT = 4000;

app.set('socketio', io);

// parse json from request's body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// database connection
connectDB();

// models
require('./models/User');
require('./models/Game');

// routes
app.use("/user", require("./routes/userRouter"));
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

// io.on('connection', (socket) => {
//   console.log('New connection occurs!');

//   socket.on('disconnect', () => {
//     console.log('User left!');
//   })
// });

//listen
server.listen(PORT, () => console.log(`Server is running on port: http://localhost:${PORT}/`));
io.listen(server);
