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
    });

    PubSub.subscribe('BoardView:update-board', (evt) => {
      const squares = evt.detail;
      createTable(this.table, squares);
    });

    PubSub.subscribe('BoardView:tile-on-board', (evt) => {
      const tileOnBoard = evt.detail;
      const coord = `${tileOnBoard.coord.x}:${tileOnBoard.coord.y}`;
      const placedTile = tileOnBoard.tile;
      const square = document.getElementById(coord);
      const tile = document.createElement(`div`);
      tile.classList.add(`tile`);
      tile.classList.add(`active-tile`);
      tile.textContent = placedTile.letter;
      tile.value = placedTile.value;
      square.appendChild(tile);
    })

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
      const tile = document.createElement(`div`);
      tile.classList.add(`tile`);
      tile.textContent = row[x].tile.letter;
      tile.value = row[x].tile.value;
      cell.appendChild(tile);
    }
    htmlRow.appendChild(cell);
  };
  table.appendChild(htmlRow);
  return table;
};

function addTileToBoard(board, tileOnBoard) {


}
