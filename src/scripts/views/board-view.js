import { ROW_NUM, COL_NUM } from '../config';

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

  const createToken = function (token) {
    const tokenElement = document.createElement('div');
    tokenElement.className = `token token--${token.id} drop`;
    const innerElement = document.createElement('div');
    innerElement.className = `token__body token__body--${token.id}`;
    const paraElement = document.createElement('p');
    paraElement.className = `token__body__sign`;
    paraElement.textContent = token.token;
    innerElement.append(paraElement);
    tokenElement.append(innerElement);
    return tokenElement;
  };

  const addCellClickHandler = function (handler) {
    parentElement.addEventListener('click', e => {
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
    newCell.append(createToken(token));
    oldCell.replaceWith(newCell);
  };
  return {
    createBoard,
    replaceCell,
    addCellClickHandler,
  };
};

export default DomBoard();
