import React, { useState, useEffect } from 'react';
import GameInfoDrawer from './GameInfoDrawer';
import IngameStyles from './IngamePage-style';
import GameBoard from './GameBoard';
import COLORS from '../../constants/colors';
import DISC_COLORS from '../../constants/discColors';

const IngamePage = () => {
  const [yourTurn, setYourTurn] = useState(true);
  const [opponentDiscColor, setOpponentDiscColor] = useState(COLORS.game.redDisc);

  const [boardSize, setBoardSize] = useState([7, 6])
  const [board, setBoard] = useState();
  const [playerCode, setPlayerCode] = useState(2);
  const [isGameEnd, setIsGameEnd] = useState(false);
  const classes = IngameStyles();

  // TODO send resquest on board change
  // useEffect(() => {
  //   return () => {
  //     cleanup
  //   }
  // }, [board])

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
     
  }

  const onPlayATurn = (col) => {
    const newBoard = [];
    for (let i = 0; i < boardSize[1]; i++) {
      newBoard.push([]);
      for (let j = 0; j < boardSize[0]; j++) {
        newBoard[i].push(board[i][j]); 
      }
    }
    for (let i = boardSize[1] - 1; i >= 0; i--) {
      if (newBoard[i][col] === 0) {
        newBoard[i][col] = playerCode;
        break;
      }
    }
    setBoard(newBoard);
    onSwitchTurn();
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

  const handleClick = () => {
    setYourTurn(!yourTurn);
  }

  return (
    <div className={classes.page}>
      <GameInfoDrawer
        yourTurn={yourTurn}
        discColor={DISC_COLORS[playerCode]}
        opponentDiscColor={opponentDiscColor}
      />
      {/* <div onClick={handleClick} className={classes.gameBoard}> */}
      <div className={classes.gameBoard}>
        <GameBoard
          board={board}
          size={boardSize}
          move={onPlayATurn}
        />
      </div>
    </div>
  )
}

export default IngamePage;
