const Square = require('./square.js');

class Board {
  constructor() {
    this.squares = createSquares();
  };

  getSquareByCoord(x, y) {
    return this.squares[y][x];
  }

  getTileByCoord(x, y) {
    const square = this.getSquareByCoord(x, y);
    return square.tile;
  };

  addTileByCoord(tile, x, y) {
    const square = this.getSquareByCoord(x, y);
    square.tile = tile;
  };

  removeTileByCoord(x, y) {
    const square = this.getSquareByCoord(x, y);
    square.tile = null;
  };

  getSquareValueByCoord(x, y) {
    const square = this.getSquareByCoord(x, y);
    return square.getTileValue();
  }

}

module.exports = Board;

function createSquares() {
  const startRowArray = [];
  const mirrorLineArray = createMirrorLine();

  for (var i = 0; i < 7; i++) {
    const startColumnArray = [];

    for (var j = 0; j < 7; j++) {
      let square;
      if (i > j) {
        square = startRowArray[j][i];
      }else{
        // Logic for multipliers here
        square = new Square();
      };
      startColumnArray.push(square);
    };

    const correctColumnArray = startColumnArray.map(square => square);
    startColumnArray.reverse()
    correctColumnArray.push(mirrorLineArray[i]);
    const columnArray = correctColumnArray.concat(startColumnArray);
    // console.log(columnArray.length);

    startRowArray.push(columnArray);
  };

  const correctRowArray = startRowArray.map(row => row);
  startRowArray.reverse();
  correctRowArray.push(mirrorLineArray);
  const rowArray = correctRowArray.concat(startRowArray);

  return rowArray;
};

function createMirrorLine() {
  const mirrorLineArray = [];
  for (var i = 0; i < 15; i++) {
    const square = new Square();
    mirrorLineArray.push(square);
  }
  return mirrorLineArray;
}
