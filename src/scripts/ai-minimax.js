import checkWinCondition from './check-win-condition';

import {
  ROW_NUM,
  COL_NUM,
  TOKEN_PLAYER_1,
  TOKEN_AI,
  TOKEN_EMPTY_CELL,
} from './config';

const getColumn = function (board, columnIndex) {
  const column = [];
  for (let i = 0; i < ROW_NUM; i += 1) {
    column.push(board[i][columnIndex]);
  }
  return column;
};

// AI
const getNextFreeMoves = function (boardState) {
  const freeSpots = [];
  // check columns for free spots
  for (let i = 0; i < COL_NUM; i += 1) {
    for (let j = 0; j < ROW_NUM; j += 1) {
      if (boardState[j][i] === TOKEN_EMPTY_CELL) {
        freeSpots.push([j, i]);
        break;
      }
    }
  }
  if (!freeSpots.length) return false;
  return freeSpots;
};

const countTokens = function (line, token) {
  return line.filter(ele => ele === token).length;
};

const evaluateMove = function (line, token) {
  const opponentToken = token === TOKEN_PLAYER_1 ? TOKEN_AI : TOKEN_PLAYER_1;
  // 4 tokens in a row
  if (countTokens(line, token) === 4) return 100;
  // 3 tokens and 1 empty space
  if (
    countTokens(line, token) === 3 &&
    countTokens(line, TOKEN_EMPTY_CELL) === 1
  )
    return 5;
  // 2 tokens and 2 empty space
  if (
    countTokens(line, token) === 2 &&
    countTokens(line, TOKEN_EMPTY_CELL) === 2
  )
    return 2;
  // DEFENSE MOVE 3 opponent tokens and 1 empty space
  if (
    countTokens(line, opponentToken) === 3 &&
    countTokens(line, TOKEN_EMPTY_CELL) === 1
  ) {
    return -4;
  }

  return 0;
};

const evaluateBoard = function (boardState, token) {
  let score = 0;
  // center column
  const centerColumn = getColumn(boardState, boardState.length / 2);
  score += countTokens(centerColumn) * 3;
  // horizontal
  for (let i = 0; i < ROW_NUM; i += 1) {
    for (let j = 0; j < COL_NUM - 3; j += 1) {
      const line = [
        boardState[i][j],
        boardState[i][j + 1],
        boardState[i][j + 2],
        boardState[i][j + 3],
      ];
      score += evaluateMove(line, token);
    }
  }
  // vertical
  for (let i = 0; i < ROW_NUM - 3; i += 1) {
    for (let j = 0; j < COL_NUM; j += 1) {
      const line = [
        boardState[i][j],
        boardState[i + 1][j],
        boardState[i + 2][j],
        boardState[i + 3][j],
      ];
      score += evaluateMove(line, token);
    }
  }
  // bottom-top diagonal
  for (let i = 3; i < ROW_NUM; i += 1) {
    for (let j = 0; j < COL_NUM - 3; j += 1) {
      const line = [
        boardState[i][j],
        boardState[i - 1][j + 1],
        boardState[i - 2][j + 2],
        boardState[i - 3][j + 3],
      ];
      score += evaluateMove(line, token);
    }
  }
  // top-bottom diagonal
  for (let i = 0; i < ROW_NUM - 3; i += 1) {
    for (let j = 0; j < COL_NUM - 3; j += 1) {
      const line = [
        boardState[i][j],
        boardState[i + 1][j + 1],
        boardState[i + 2][j + 2],
        boardState[i + 3][j + 3],
      ];
      score += evaluateMove(line, token);
    }
  }
  return score;
};
const boardFull = function (boardState) {
  for (const row of boardState) {
    if (row.includes(TOKEN_EMPTY_CELL)) return false;
  }
  return true;
};

const minimax = function (boardState, depth, maximizer) {
  // break condition terminate game
  if (checkWinCondition(boardState, TOKEN_AI)) {
    // console.log('WIN');
    return 1000000000000;
  }
  if (checkWinCondition(boardState, TOKEN_PLAYER_1)) {
    // console.log('lose');
    return -1000000000000;
  }
  if (boardFull(boardState)) {
    // console.log('board full');
    return 0;
  }
  if (depth === 0) return evaluateBoard(boardState, TOKEN_AI);

  const availableMoves = getNextFreeMoves(boardState);
  if (maximizer) {
    let bestMove = -Infinity;
    for (const move of availableMoves) {
      boardState[move[0]][move[1]] = TOKEN_AI;
      bestMove = Math.max(bestMove, minimax(boardState, depth - 1, !maximizer));
      boardState[move[0]][move[1]] = TOKEN_EMPTY_CELL;
    }
    return bestMove;
  } else {
    let bestMove = Infinity;
    for (const move of availableMoves) {
      boardState[move[0]][move[1]] = TOKEN_PLAYER_1;
      bestMove = Math.min(bestMove, minimax(boardState, depth - 1, !maximizer));
      boardState[move[0]][move[1]] = TOKEN_EMPTY_CELL;
    }
    return bestMove;
  }
};

export default function findBestMove(boardState) {
  let bestValue = -Infinity;
  let bestMove;
  const freeMoves = getNextFreeMoves(boardState);
  for (const [i, j] of freeMoves) {
    boardState[i][j] = TOKEN_AI;
    const currentValue = minimax(boardState, 5, false);
    boardState[i][j] = TOKEN_EMPTY_CELL;
    if (currentValue > bestValue) {
      bestValue = currentValue;
      bestMove = [i, j];
    }
  }
  return bestMove;
}
