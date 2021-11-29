import { ROW_NUM, COL_NUM } from '../config';

const DomBoard = function () {
  const parentElement = document.querySelector('.board-wrapper');
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

  const replaceCell = function (rowIndex, colIndex) {
    const oldCell = document.querySelector(
      `[data-row-index="${rowIndex}"][data-col-index="${colIndex}"]`
    );

    const newCell = document.createElement('div');
    newCell.className = 'board-cell';
    newCell.innerHTML = `
    <div class="token token--p1 drop">
      <div class="token__body token__body--p1">
        <p class="token__body__sign">🦝</p>
      </div>
    </div>
    `;
    oldCell.replaceWith(newCell);
  };
  return {
    replaceCell,
  };
};

export default DomBoard;
