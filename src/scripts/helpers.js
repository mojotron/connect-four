// helper function for debugging modal side
import { TOKEN_EMPTY_CELL } from './config';

export const boardFull = function (boardState) {
  for (const row of boardState) {
    if (row.includes(TOKEN_EMPTY_CELL)) return false;
  }
  return true;
};

export const displayBoard = function (board) {
  console.log('--Connect four board--');
  const reversed = JSON.parse(JSON.stringify(board));
  reversed.reverse();
  reversed.forEach(row => console.log(row));
};
