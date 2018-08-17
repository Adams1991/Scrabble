const Board = require("../models/board.js");

class BoardView {
  constructor(table) {
    this.table = table;
  }

  bindEvents(){
    createTable(this.table);
  };


}

module.exports = BoardView;

function createTable(table) {
  const board = new Board();
  const squares = board.squares;
  squares.reduce(addRow, table);
}

function addRow(table, row, y) {
  const htmlRow = document.createElement(`tr`);
  for (var x = 0; x < row.length; x++) {
    const cell = document.createElement(`td`);
    cell.id = `x${x}y${y}`;
    cell.classList.add('square');
    htmlRow.appendChild(cell);
  }
  table.appendChild(htmlRow);
  return table;
}
