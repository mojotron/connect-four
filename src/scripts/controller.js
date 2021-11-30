import '../styles/reset.css';
import '../styles/main.css';
// import {
//   ROW_NUM,
//   COL_NUM,
//   TOKEN_EMPTY_CELL,
//   TOKEN_PLAYER_1,
//   TOKEN_AI,
//   PLAYER_1,
//   PLAYER_AI,
// } from './config';

import DomBoard from './views/board-view';
import * as model from './model';

// initialize state
model.init('pvp', null);
model.displayBoard(model.state.board);

DomBoard.createBoard();
DomBoard.addCellClickHandler(i => {
  const x = model.inputToken(
    model.state.board,
    i,
    model.state.players[model.state.currentPlayer].token
  );
  model.state.swapPlayers();
  model.displayBoard(model.state.board);
  DomBoard.replaceCell(
    x[0],
    x[1],
    model.state.players[model.state.currentPlayer]
  );
});

// const curr = model.state.players[model.state.currentPlayer];
// DomBoard.replaceCell(0, 0, curr);
// console.log(model.state);
