import '../styles/reset.css';
import '../styles/main.css';
import * as model from './model';
import { DRAW } from './config';
import DomBoard from './views/board-view';
import currentPlayerView from './views/current-player-view';
import overlayView from './views/overlay-view';
import newGameModalView from './views/new-game-modal-view';
import logoView from './views/logo-view';
import callBtnView from './views/call-btn-view';

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

// const terminateStateCoordinator = function (terminateState) {
// };

const makeAiMoveController = function (sec) {
  setTimeout(() => {
    const [row, column] = model.aiMove();
    updateStateBoard(column);
    updateDomBoard(row, column);
    const win = model.checkTerminateState();
    if (win === DRAW) {
      currentPlayerView.setIcon(DRAW);
      overlayView.add();
      return;
    }
    if (win) {
      overlayView.add();
      setTimeout(() => DomBoard.addWinningLine(win), 1250);
      return;
    }
    model.state.swapPlayers();
    currentPlayerView.setIcon(
      model.state.players[model.state.currentPlayer].token
    );
    overlayView.remove();
  }, sec * 1000);
};

const makePlayerMoveController = function (columnIndex) {
  const userInput = updateStateBoard(columnIndex);
  if (!userInput) return false; // if column is full stop, false value is used in ai controller
  updateDomBoard(userInput[0], userInput[1]);
  const win = model.checkTerminateState();
  if (win === DRAW) {
    currentPlayerView.setIcon(DRAW);
    overlayView.add();
    return;
  }
  if (win) {
    overlayView.add();
    setTimeout(() => DomBoard.addWinningLine(win), 1250);
    return;
  }
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
  overlayView.add();
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

const callNewGameController = function () {
  callBtnView.remove();
  DomBoard.removeBoard();
  currentPlayerView.removeIcon();
  newGameModalView.createModal(newGameStartController);
};

const newGameStartController = function (mode) {
  newGameModalView.removeModal();
  overlayView.remove();
  callBtnView.add(callNewGameController);
  init(mode);
};

window.addEventListener('DOMContentLoaded', () => {
  logoView.add();
  newGameModalView.createModal(newGameStartController);
});
