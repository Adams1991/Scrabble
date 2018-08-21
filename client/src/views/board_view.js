const Board = require("../models/board.js");
const PubSub = require('../helpers/pub_sub.js');

class BoardView {
  constructor(table) {
    this.table = table;
  }

  bindEvents(){
    this.table.addEventListener('click', (evt) => {
      const squareCoordsArray = evt.target.id.split(`:`);
      const squareCoords = {
        x: parseInt(squareCoordsArray[0], 10),
        y: parseInt(squareCoordsArray[1], 10)
      };
      PubSub.publish(`Turn:coord-of-last-square-clicked`, squareCoords);
      console.log(squareCoords);
    });
    PubSub.subscribe('BoardView:update-board', (evt) => {
      const squares = evt.detail;
      createTable(this.table, squares);
    });
  };

};

module.exports = BoardView;

function createTable(table, squares) {
  table.innerHTML = ``;
  squares.reduce(addRow, table);
};

function addRow(table, row, y) {
  const htmlRow = document.createElement(`tr`);
  for (var x = 0; x < row.length; x++) {
    const cell = document.createElement(`td`);
    cell.id = `${x}:${y}`;
    cell.classList.add('square');
    if (row[x].tile !== null){
      cell.textContent = row[x].tile.letter;
    }
    htmlRow.appendChild(cell);
  };
  table.appendChild(htmlRow);
  return table;
};
