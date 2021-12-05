import { ROW_NUM, COL_NUM } from '../config';
import tokenView from './token-view';

const DomBoard = function () {
  const parentElement = document.querySelector('.board-wrapper');
  const createBoard = function () {
    const board = document.createElement('div');
    board.className = 'game-board';
    board.style.gridTemplateColumns = `repeat(${COL_NUM}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${ROW_NUM}, 1fr)`;

    for (let i = ROW_NUM - 1; i >= 0; i -= 1) {
      for (let j = 0; j < COL_NUM; j += 1) {
        const cell = document.createElement('div');
        cell.className = 'board-cell';
        cell.dataset.rowIndex = i;
        cell.dataset.colIndex = j;
        // cell.style.gridArea = `${i + 1} / ${j + 1} / ${i + 2} / ${j + 2}`;
        board.append(cell);
      }
    }

    parentElement.append(board);
  };

  const addCellClickHandler = function (handler) {
    document.querySelector('.game-board').addEventListener('click', e => {
      const cell = e.target.closest('.board-cell');
      if (!cell) return;
      handler(cell.dataset.colIndex);
    });
  };

  const replaceCell = function (rowIndex, colIndex, token) {
    const oldCell = document.querySelector(
      `[data-row-index="${rowIndex}"][data-col-index="${colIndex}"]`
    );
    const newCell = document.createElement('div');
    newCell.dataset.rowIndex = rowIndex;
    newCell.dataset.colIndex = colIndex;
    newCell.className = 'board-cell';
    newCell.append(tokenView.create(token));
    oldCell.replaceWith(newCell);
  };

  const addWinningLine = function (winLine) {
    winLine.forEach(position => {
      document
        .querySelector(
          `[data-row-index="${position[0]}"][data-col-index="${position[1]}"]`
        )
        .classList.add('winner');
    });
  };

  const removeBoard = function () {
    const board = document.querySelector('.game-board');
    parentElement.removeChild(board);
  };

  return {
    createBoard,
    removeBoard, // for memory leak
    replaceCell,
    addCellClickHandler,
    addWinningLine,
  };
};

export default DomBoard();
