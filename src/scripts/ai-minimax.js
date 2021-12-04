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

const getNextAvailableMoves = function (boardState) {
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

const boardFull = function (boardState) {
  for (const row of boardState) {
    if (row.includes(TOKEN_EMPTY_CELL)) return false;
  }
  return true;
};

const evaluateMove = function (line, token) {
  const opponentToken = token === TOKEN_PLAYER_1 ? TOKEN_AI : TOKEN_PLAYER_1;
  // 4 tokens in a row
  if (countTokens(line, token) === 4) return 1000;
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
    return 100;
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

const minimax = function (boardState, depth, alpha, beta, maximizer) {
  // break condition AI wins, human wins, board filled or recursion max depth
  if (checkWinCondition(boardState, TOKEN_AI)) return 1000000000;
  if (checkWinCondition(boardState, TOKEN_PLAYER_1)) return -1000000000;
  if (boardFull(boardState)) return 0;
  if (depth === 0) return evaluateBoard(boardState, TOKEN_AI);

  const availableMoves = getNextAvailableMoves(boardState);

  if (maximizer) {
    let bestMove = -Infinity;
    for (const [i, j] of availableMoves) {
      boardState[i][j] = TOKEN_AI;
      bestMove = Math.max(
        bestMove,
        minimax(boardState, depth - 1, alpha, beta, !maximizer)
      );
      boardState[i][j] = TOKEN_EMPTY_CELL;
      alpha = Math.max(alpha, bestMove);
      if (beta <= alpha) break;
    }
    return bestMove;
  } else {
    let bestMove = Infinity;
    for (const [i, j] of availableMoves) {
      boardState[i][j] = TOKEN_PLAYER_1;
      bestMove = Math.min(
        bestMove,
        minimax(boardState, depth - 1, alpha, beta, !maximizer)
      );
      boardState[i][j] = TOKEN_EMPTY_CELL;
      beta = Math.min(beta, bestMove);
      if (beta <= alpha) break;
    }
    return bestMove;
  }
};

export default function findBestMove(boardState, depth) {
  let bestValue = -Infinity;
  let bestMove;
  const availableMoves = getNextAvailableMoves(boardState);
  for (const [i, j] of availableMoves) {
    boardState[i][j] = TOKEN_AI;
    const currentValue = minimax(boardState, depth, -Infinity, Infinity, false);
    boardState[i][j] = TOKEN_EMPTY_CELL;
    if (currentValue > bestValue) {
      bestValue = currentValue;
      bestMove = [i, j];
    }
  }
  return bestMove;
}
