// import { TOKEN_PLAYER_1 } from './config';
const ROW_NUM = 6;
const COL_NUM = 7;
const TOKEN_EMPTY_CELL = '--';
const TOKEN_PLAYER_1 = '😸';
const TOKEN_AI = '🤖';
// prettier-ignore
const board = [
  ['--', '--', '--', '--', '😸', '--', '--'],
  ['--', '--', '--', '--', '😸', '--', '--'],
  ['--', '--', '--', '--', '😸', '--', '--'],
  ['--', '--', '--', '--', '--', '--', '--'],
  ['--', '--', '--', '--', '--', '--', '--'],
  ['--', '--', '--', '--', '--', '--', '--'],
];
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
  )
    return -4;

  return 0;
};

const evaluateBoard = function (boardState, token) {
  let score = 0;
  // center column
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

const minimax = function (boardState, depth, maximizer) {
  // break condition
  if (depth === 0) return;
  const boardStateEvaluation = evaluateBoard(boardState, TOKEN_AI);
  console.log(boardStateEvaluation);
  const availableMoves = getNextFreeMoves(boardState);
  if (maximizer) {
    let bestMove = -Infinity;
    availableMoves.forEach(move => {
      boardState[move[0]][move[1]] = TOKEN_AI;
      bestMove = Math.max(bestMove, minimax(boardState, depth - 1, !maximizer));
      boardState[move[0]][move[1]] = TOKEN_EMPTY_CELL;
    });
    return bestMove;
  } else {
    let bestMove = -Infinity;
    availableMoves.forEach(move => {
      boardState[move[0]][move[1]] = TOKEN_AI;
      bestMove = Math.max(bestMove, minimax(boardState, depth - 1, !maximizer));
      boardState[move[0]][move[1]] = TOKEN_EMPTY_CELL;
    });
    return bestMove;
  }
};

const findBestMove = function (boardState) {
  let bestValue = -Infinity;
  let bestMove;
  const freeMoves = getNextFreeMoves(boardState);
  freeMoves.forEach(move => {
    boardState[move[0]][move[1]] = TOKEN_AI;
    const currentValue = minimax(boardState, 3, false);
    boardState[move[0]][move[1]] = 0;
    if (currentValue > bestValue) {
      bestValue = currentValue;
      bestMove = move;
    }
  });
  return bestMove;
};

console.log(findBestMove(board));
