"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var mongoose = require('mongoose');

var Game = mongoose.model('Game');
var User = mongoose.model('User');
var Board = mongoose.model('Board');
var Messages = mongoose.model('Messages');

var uuid = require('shortid');

var boardSize = [7, 6];

var move = function move(board, column, playerCode) {
  for (var i = boardSize[1] - 1; i >= 0; i--) {
    if (board[i][column] === 0) {
      board[i][column] = playerCode;
      return {
        successful: true,
        position: [i, column]
      };
    }
  }

  return {
    successful: false,
    position: null
  };
};

var emitCurrentGames = function emitCurrentGames(userID, socket) {
  var foundUser, ownerCurrentGameIDs, ownerCurrentGames;
  return regeneratorRuntime.async(function emitCurrentGames$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.findOne({
            id: userID
          }));

        case 2:
          foundUser = _context.sent;
          ownerCurrentGameIDs = foundUser.currentGames;
          _context.next = 6;
          return regeneratorRuntime.awrap(Game.find({
            "id": {
              "$in": ownerCurrentGameIDs
            }
          }));

        case 6:
          ownerCurrentGames = _context.sent;
          socket.emit("currentGames#".concat(userID), ownerCurrentGames);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
};

var checkVertical = function checkVertical(board, i, j, playerCode) {
  var discNum = 0;

  for (var r = i; r >= 0; r--) {
    if (board[r][j] !== playerCode) {
      break;
    }

    discNum++;
  }

  for (var _r = i; _r < board.length; _r++) {
    if (board[_r][j] !== playerCode) {
      break;
    }

    discNum++;
  }

  return discNum - 1 >= 4;
};

var checkHorizontal = function checkHorizontal(board, i, j, playerCode) {
  var discNum = 0;

  for (var c = j; c >= 0; c--) {
    if (board[i][c] !== playerCode) {
      break;
    }

    discNum++;
  }

  for (var _c = j; _c < board[0].length; _c++) {
    if (board[i][_c] !== playerCode) {
      break;
    }

    discNum++;
  }

  return discNum - 1 >= 4;
};

var checkDiagonalTopRight = function checkDiagonalTopRight(board, i, j, playerCode) {
  var discNum = 0;
  var upI = i,
      downI = i,
      rightJ = j,
      leftJ = j;

  while (upI >= 0 && rightJ < board[0].length && board[upI][rightJ] === playerCode) {
    discNum++;
    upI--;
    rightJ++;
  }

  while (downI < board.length && leftJ >= 0 && board[downI][leftJ] === playerCode) {
    discNum++;
    downI++;
    leftJ--;
  }

  return discNum - 1 >= 4;
};

var checkDiagonalTopLeft = function checkDiagonalTopLeft(board, i, j, playerCode) {
  var discNum = 0;
  var upI = i,
      downI = i,
      rightJ = j,
      leftJ = j;

  while (upI >= 0 && leftJ >= 0 && board[upI][leftJ] === playerCode) {
    discNum++;
    upI--;
    leftJ--;
  }

  while (downI < board.length && rightJ < board[0].length && board[downI][rightJ] === playerCode) {
    discNum++;
    downI++;
    rightJ++;
  }

  return discNum - 1 >= 4;
};

var checkGameEnd = function checkGameEnd(board, lastMovePosition) {
  var _lastMovePosition = _slicedToArray(lastMovePosition, 2),
      i = _lastMovePosition[0],
      j = _lastMovePosition[1];

  var lastMoveCode = board[i][j];
  return checkVertical(board, i, j, lastMoveCode) || checkHorizontal(board, i, j, lastMoveCode) || checkDiagonalTopLeft(board, i, j, lastMoveCode) || checkDiagonalTopRight(board, i, j, lastMoveCode);
};

var checkFullBoard = function checkFullBoard(board) {
  return !board.some(function (row) {
    return row.includes(0);
  });
};

var playAMove = function playAMove(request, response) {
  var _request$body$params, roomID, column, playerID, foundBoard, foundGame, playerCode, newBoard, lastMove, opponent, updatedGame, socket;

  return regeneratorRuntime.async(function playAMove$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _request$body$params = request.body.params, roomID = _request$body$params.roomID, column = _request$body$params.column;
          playerID = request.userID;
          _context2.next = 5;
          return regeneratorRuntime.awrap(Board.findOne({
            id: roomID
          }));

        case 5:
          foundBoard = _context2.sent;

          if (foundBoard) {
            _context2.next = 8;
            break;
          }

          throw 'Board not available.';

        case 8:
          _context2.next = 10;
          return regeneratorRuntime.awrap(Game.findOne({
            id: roomID
          }));

        case 10:
          foundGame = _context2.sent;

          if (foundGame.started) {
            _context2.next = 13;
            break;
          }

          throw 'This game is not started yet!';

        case 13:
          playerCode = foundGame.players.map(function (p) {
            return p.id;
          }).indexOf(playerID) + 1;
          newBoard = foundBoard.board;
          lastMove = move(newBoard, column, playerCode);

          if (lastMove.successful) {
            _context2.next = 19;
            break;
          }

          response.json({
            message: "That column is full."
          });
          return _context2.abrupt("return");

        case 19:
          _context2.next = 21;
          return regeneratorRuntime.awrap(Board.updateOne({
            id: roomID
          }, {
            "$set": {
              "board": newBoard
            }
          }));

        case 21:
          opponent = foundGame.players.filter(function (player) {
            return player.id !== playerID;
          })[0];
          _context2.next = 24;
          return regeneratorRuntime.awrap(Game.findOneAndUpdate({
            id: roomID
          }, {
            "$inc": {
              "movesOccured": 1
            },
            "$set": {
              "currentPlayer": opponent
            }
          }, {
            useFindAndModify: false,
            "new": true
          }));

        case 24:
          updatedGame = _context2.sent;
          socket = request.app.get('socketio');
          emitCurrentGames(opponent.id, socket);

          if (!checkFullBoard(newBoard)) {
            _context2.next = 33;
            break;
          }

          _context2.next = 30;
          return regeneratorRuntime.awrap(Game.updateOne({
            id: roomID
          }, {
            "$set": {
              "ended": true
            }
          }));

        case 30:
          updatedGame.ended = true;
          _context2.next = 38;
          break;

        case 33:
          if (!checkGameEnd(newBoard, lastMove.position)) {
            _context2.next = 38;
            break;
          }

          _context2.next = 36;
          return regeneratorRuntime.awrap(Game.updateOne({
            id: roomID
          }, {
            "$set": {
              "ended": true,
              "winner": playerID
            }
          }));

        case 36:
          updatedGame.ended = true;
          updatedGame.winner = playerID;

        case 38:
          if (!updatedGame.ended) {
            _context2.next = 41;
            break;
          }

          _context2.next = 41;
          return regeneratorRuntime.awrap(User.updateMany({
            currentGames: roomID
          }, {
            "$pull": {
              currentGames: roomID
            }
          }));

        case 41:
          socket.emit("game#".concat(roomID), {
            game: updatedGame,
            board: newBoard
          });
          response.json({
            message: "Played successfully."
          });
          _context2.next = 48;
          break;

        case 45:
          _context2.prev = 45;
          _context2.t0 = _context2["catch"](0);
          response.status(400).send(_context2.t0);

        case 48:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 45]]);
};

var getMessages = function getMessages() {};

module.exports = {
  playAMove: playAMove
};