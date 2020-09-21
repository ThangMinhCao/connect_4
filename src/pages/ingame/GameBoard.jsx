import React, { useState, useEffect } from 'react';
import IngameStyle from './IngamePage-style';
import {
  Stage,
  Layer,
  Rect,
  Circle,
} from 'react-konva';
import COLORS from '../../constants/colors';
import DISC_COLORS from '../../constants/discColors';

const boardRow = 6;
const boardColumn = 7;

const Board = ({ board, size, width, height, move }) => {
  const [rows, cols] = size;
  const generateCell = (cellSize) => {
    return (
      board.map((row, i) => (
        row.map((cellValue, j) => (
          {
            x: 15 + j * cellSize,
            y: 15 + i * cellSize,
            discColor: DISC_COLORS[cellValue],
          }
        ))
      )) 
    )
  }

  const generateBoard = () => {
    if (board) {
      // console.log(generateCell(100));
      return (
        generateCell(width / 7).map((row, i) => (
          row.map((cell, j) => (
            <Rect
              key={(i, j)}
              x={cell.x}
              y={cell.y}
              width={width / 7 * 0.88}
              height={height / 6 * 0.85}
              fill={cell.discColor}
              cornerRadius={100}
              shadowBlur={10}
              onClick={() => move(j)}
              onTap={() => move(j)}
            />
          ))
        ))
      )
    }
  }

  // useEffect(() => {
  //   console.log(board);
  // }, [board])

  return (
    <>
      <Rect
        x={10}
        y={10}
        cornerRadius={10}
        width={width}
        height={height}
        fill={COLORS.game.boardBackground}
        shadowBlur={3}
      />
      {generateBoard()}
    </>
  )
}

const GameBoard = ({
  board, size, move
}) => {
  const classes = IngameStyle();

  const generateBoardSize = () => {
    let width = window.innerWidth;
    if (width > 800) {
      width = 800;
    }
    const height = width / 7 * 6;
    return [width, height];
  }

  const [boardSize, setBoardSize] = useState({
    width: generateBoardSize()[0],
    height: generateBoardSize()[1],
  });

  const handleSizeChange = () => {
    const [width, height] = generateBoardSize();
    setBoardSize({
      width: width,
      height: height,
    })
  }

  useEffect(() => {
    window.addEventListener('resize', handleSizeChange);
    return () => {
      window.removeEventListener('resize', handleSizeChange);
    }
  }, [])
// calc(10vh + 9vw)
  return (
    <Stage width={boardSize.width} height={boardSize.height}>
      <Layer>
        <Board
          board={board}
          width={boardSize.width * 0.95}
          height={boardSize.height * 0.94}
          size={size}
          move={move}
        />
      </Layer>
    </Stage>
  )
}

export default GameBoard;

