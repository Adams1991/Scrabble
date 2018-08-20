const Board = require("../models/board.js");
const PubSub = require('../helpers/pub_sub.js');

class BoardView {
  constructor(table) {
    this.table = table;
  }

  bindEvents(){
    this.table.addEventListener('click', (evt) => {
      const squareCoord = evt.target.id;
      PubSub.publish(`BoardView:coord-of-last-square-clicked`, squareCoord);
      console.log(squareCoord);
    });
    PubSub.subscribe('BoardView:update-board', (evt) => {
      const squares = evt.detail;
      createTable(this.table, squares);
    });
  };

};

module.exports = BoardView;

function createTable(table, squares) {
  this.table.innerHTML = ``;
  squares.reduce(addRow, table);
};

function addRow(table, row, y) {
  const htmlRow = document.createElement(`tr`);
  for (var x = 0; x < row.length; x++) {
    const cell = document.createElement(`td`);
    cell.id = `${x}:${y}`;
    cell.classList.add('square');
    htmlRow.appendChild(cell);
  };
  table.appendChild(htmlRow);
  return table;
};
