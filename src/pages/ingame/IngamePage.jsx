import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
// import queryString from 'query-string';
import GameInfoDrawer from './GameInfoDrawer';
import IngameStyles from './IngamePage-style';
import GameBoard from './GameBoard';
import EndGameDialog from './EndGameDialog';
import StartGameDialog from './StartGameDialog';
import DISC_COLORS from '../../constants/discColors';
import server_api from '../../api/server_api';
import ENDPOINTS from '../../constants/endpoints';

const boardSize = [7, 6];

const IngamePage = ({ socket, userID }) => {
  const history = useHistory();
  // TODO
  /* eslint-disable */
  const [loaded, setLoaded] = useState(false);
  const [board, setBoard] = useState();
  const [isGameEnd, setIsGameEnd] = useState(false);
  const [winner, setWinner] = useState(0);
  const classes = IngameStyles();
  const location = useLocation();

  const [playersCode, setPlayersCode] = useState({ yourCode: 0, opponentCode: 0 })
  const [gameInfo, setGameInfo] = useState();
  const [yourTurn, setYourTurn] = useState(false);
  const [roomID, setRoomID] = useState('');

  useEffect(() => {
    if (!location.state) {
      history.push('/room');
    } else {
      setRoomID(location.state.roomID);
    }
  }, [history])

  useEffect(() => {
    const getGameInfo = async () => {
      try {
        await server_api.get(ENDPOINTS.getGame, {
          headers: {
            token: localStorage.getItem('account_token')
          }, 
          params: {
            roomID
          }
        });
        // setRoomList(response.data.games)
      } catch (err) {
        console.log('An error occurs: ', err.response.data);
      }
    }
    getGameInfo();

    socket.on(`game#${roomID}`, (data) => {
      setGameInfo(data.game);
      setBoard(data.board);
      setLoaded(true);
    });
    return () => {
      socket.removeAllListeners(`game#${roomID}`);
    }
  }, [roomID])

  useEffect(() => {
    if (gameInfo) {
      gameInfo.players.forEach((player, index) => {
        if (player.id === userID) {
          setPlayersCode({ yourCode: index + 1, opponentCode: 2 - index });
          return;
        }
      })
    }
  }, [loaded])

  useEffect(() => {
    if (gameInfo) {
      setYourTurn(gameInfo.currentPlayer && gameInfo.currentPlayer.id === userID);
      setIsGameEnd(gameInfo.ended);
      setWinner(gameInfo.winner);
    }
  }, [gameInfo])

  const playAMove = async (column) => {
    try {
      await server_api.put(ENDPOINTS.playAMove, {
        params: {
          roomID,
          column 
        }
      }, {
        headers: {
          token: localStorage.getItem('account_token')
        }, 
      });
    } catch (err) {
      console.log('An error occurs: ', err.response.data);
    }
  }

  useEffect(() => {
    let board = [];
    for (let i = 0; i < boardSize[1]; i++) {
      board.push([]);
      for (let j = 0; j < boardSize[0]; j++) {
        board[i].push(0);
      }
    }
    setBoard(board);
  }, [])

  // const handleClick = () => {
  //   setYourTurn(!yourTurn);
  // }

  return (
      !gameInfo 
      ? <div />
      : <div className={classes.page}>
          <StartGameDialog game={gameInfo} userID={userID} />
          <GameInfoDrawer
            roomName={gameInfo.name}
            roomID={gameInfo.id}
            yourTurn={yourTurn}
            discColor={DISC_COLORS[playersCode.yourCode]}
            opponentDiscColor={DISC_COLORS[playersCode.opponentCode]}
            movesPlayed={gameInfo.movesOccured}
          />
          <div className={classes.gameBoard}>
            <GameBoard
              board={board}
              size={boardSize}
              move={playAMove}
              yourTurn={yourTurn}
            />
          </div>
          <EndGameDialog
            winner={winner}
            isGameEnd={isGameEnd}
            userID={userID}
            movesOccured={gameInfo.movesOccured}
          />
      </div>
  )
}

export default IngamePage;
