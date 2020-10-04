import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import queryString from 'query-string';
import GameInfoDrawer from './GameInfoDrawer';
import IngameStyles from './IngamePage-style';
import GameBoard from './GameBoard';
import EndGameDialog from './EndGameDialog';
import COLORS from '../../constants/colors';
import DISC_COLORS from '../../constants/discColors';
import server_api from '../../api/server_api';
import ENDPOINTS from '../../constants/endpoints';

const IngamePage = ({ socket, userID, roomID }) => {
  // TODO
  /* eslint-disable */
  const [yourTurn, setYourTurn] = useState(true);
  const [opponentDiscColor, setOpponentDiscColor] = useState(COLORS.game.redDisc);
  const [boardSize, setBoardSize] = useState([7, 6])
  const [board, setBoard] = useState();
  const [playerCode, setPlayerCode] = useState(2);
  const [isGameEnd, setIsGameEnd] = useState(false);
  const [winner, setWinner] = useState(0);
  const classes = IngameStyles();

  const [gameInfo, setGameInfo] = useState({});
  const history = useHistory();

  // TODO send resquest on board change
  // useEffect(() => {
  //   return () => {
  //     cleanup
  //   }
  // }, [board])

  useEffect(() => {
    if (!socket || !userID || !localStorage.getItem('account_token')) {
      history.push('/room');
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
      console.log(data);
      setGameInfo(data.game);
      setBoard(data.board);
    });
    return () => {
      socket.removeAllListeners(`board#${roomID}`);
    }
  }, [])

  const playAMove = async (column) => {
    console.log(gameInfo);
    try {
      const response = await server_api.put(ENDPOINTS.playAMove, {
        params: {
          roomID,
          column 
        }
      }, {
        headers: {
          token: localStorage.getItem('account_token')
        }, 
      });
      // console.log(response.data.message);
    } catch (err) {
      console.log('An error occurs: ', err.response.data);
    }
  }

  const togglePlayerCode = () => {
    if (playerCode === 1) {
      setPlayerCode(2);
    } else {
      setPlayerCode(1);
    }
  }

  const onSwitchTurn = () => {
    setYourTurn(!yourTurn);
    togglePlayerCode();
  }

  // i, j represent the position of last move
  const checkGameEnd = (i, j) => {
     if (!board.some((row) => row.includes(0))) {
       setIsGameEnd(true);
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
    <div className={classes.page}>
      <GameInfoDrawer
        yourTurn={yourTurn}
        discColor={DISC_COLORS[playerCode]}
        opponentDiscColor={opponentDiscColor}
      />
      <div className={classes.gameBoard}>
        <GameBoard
          board={board}
          size={boardSize}
          move={playAMove}
        />
      </div>
      <EndGameDialog winner={winner} playerCode={playerCode} isGameEnd={isGameEnd} />
    </div>
  )
}

export default IngamePage;
