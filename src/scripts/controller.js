import '../styles/reset.css';
import '../styles/main.css';

import * as model from './model';
import DomBoard from './views/board-view';
import currentPlayerView from './views/current-player-view';
import overlayView from './views/overlay-view';

const updateStateBoard = function (column) {
  return model.inputToken(
    model.state.board,
    column,
    model.state.players[model.state.currentPlayer].token
  );
};

const updateDomBoard = function (row, column) {
  DomBoard.replaceCell(
    row,
    column,
    model.state.players[model.state.currentPlayer]
  );
};

const makeAiMoveController = function (sec) {
  setTimeout(() => {
    const [row, column] = model.aiMove();
    updateStateBoard(column);
    updateDomBoard(row, column);
    const win = model.checkTerminateState();
    if (win) return;
    model.state.swapPlayers();

    currentPlayerView.setIcon(
      model.state.players[model.state.currentPlayer].token
    );

    document.querySelector('.overlay').classList.add('hidden');
  }, sec * 1000);
};

const makePlayerMoveController = function (columnIndex) {
  const userInput = updateStateBoard(columnIndex);
  if (!userInput) return false; // if column is full stop, false value is used in ai controller
  updateDomBoard(userInput[0], userInput[1]);
  const win = model.checkTerminateState();
  if (win) return;
  model.state.swapPlayers();

  currentPlayerView.setIcon(
    model.state.players[model.state.currentPlayer].token
  );

  return true;
};

const pvpClickBoardController = function (columnDom) {
  makePlayerMoveController(columnDom);
};

const aiClickBoardController = function (columnDom) {
  const validMove = makePlayerMoveController(columnDom);
  if (!validMove) return;
  document.querySelector('.overlay').classList.remove('hidden');
  makeAiMoveController(1.5);
};

const init = function (mode) {
  model.init(mode);
  currentPlayerView.setIcon(
    model.state.players[model.state.currentPlayer].token
  );
  DomBoard.createBoard();
  if (mode === 'pvp') {
    DomBoard.addCellClickHandler(pvpClickBoardController);
  } else {
    DomBoard.addCellClickHandler(aiClickBoardController);
    // if ai goes first
    if (model.state.currentPlayer === 'two') makeAiMoveController(0.1);
  }
};

const btn = document.querySelector('button');
btn.addEventListener('click', e => {
  e.preventDefault();
  const mode = document.querySelector('input[name="game-mode"]:checked');
  overlayView.remove();
  document.querySelector('.new-game').classList.add('hidden');
  init(mode.value);
});
