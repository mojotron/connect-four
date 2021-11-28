import { ROW_NUM, COL_NUM } from '../config';

const DomBoard = function () {
  const board = document.createElement('div');
  board.className = 'game-board';
  board.style.gridTemplateColumns = `repeat(${COL_NUM}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${ROW_NUM}, 1fr)`;
  // create column wrappers
  for (let i = 0; i < COL_NUM; i += 1) {
    const column = document.createElement('div');
    column.className = 'board-column';
    column.dataset.columnIndex = i;
    column.style.gridRow = `${1} / ${ROW_NUM + 1}`;
    board.append(column);
    column.addEventListener('click', e => {
      alert(e.target.dataset.columnIndex);
    });
  }

  const fillColumns = function (data) {
    const columns = document.querySelectorAll('.board-column');
    columns.forEach((col, i) => {
      for (let j = 0; j < ROW_NUM; j += 1) {
        const cell = document.createElement('div');
        cell.className = 'board-cell';
        cell.textContent = data[i][j];
      }
    });
  };

  // for (let i = 0; i < ROW_NUM; i += 1) {
  //   for (let j = 0; j < COL_NUM; j += 1) {
  //     // <row-start> / <column-start> / <row-end> / <column-end>;
  //     const element = document.createElement('div');
  //     element.className = 'board-cell';
  //     element.textContent = data[i][j];
  //     element.style.gridArea = `${i + 1} / ${j + 1} / ${i + 2} / ${j + 2}`;
  //     board.append(element);
  //   }
  // }
  document.body.append(board);
  return { fillColumns };
};

export default DomBoard;
