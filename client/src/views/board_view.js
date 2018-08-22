const Board = require("../models/board.js");
const PubSub = require('../helpers/pub_sub.js');

class BoardView {
  constructor(table) {
    this.table = table;
  }

  bindEvents(){
    console.log(this.table);
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
    const doubleLetterSquares = ['0:3','0:11','2:6','2:8','3:0','3:7','3:14','6:2','6:6','6:8','6:12','7:3','7:11','8:2','8:6','8:8','8:12','11:0','11:7','11:14','12:6','12:8','14:3','14:11'];
    const tripleLetterSquares = ['1:5','1:9','5:1','5:5','5:9','5:13','9:1','9:5','9:9','9:13','13:5','13:9'];
    const doubleWordSquares = ['1:1','1:13','2:2','2:12','3:3','3:11','4:4','4:10','7:7','10:4','10:10','11:3','11:11','12:2','12:12','13:1','13:13'];
    const tripleWordSquares = ['0:0','0:7','0:14','7:0','7:14','14:0','14:7','14:14'];
    if (doubleLetterSquares.includes(cell.id)) {cell.classList.add('double-letter')};
    if (tripleLetterSquares.includes(cell.id)) {cell.classList.add('triple-letter')};
    if (doubleWordSquares.includes(cell.id)) {cell.classList.add('double-word')};
    if (tripleWordSquares.includes(cell.id)) {cell.classList.add('triple-word')};
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
