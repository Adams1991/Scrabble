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
  };

  getAdjacentTiles(x, y) {
    const adjacentTiles = [];

    const left = x-1
    const up = y-1
    const right = x+1
    const down = y+1

    if (left >= 0 && this.getTileByCoord(left, y)) {
      adjacentTiles.push(this.getTileByCoord(left, y));
    };
    if (down < 15 && this.getTileByCoord(x, down)) {
      adjacentTiles.push(this.getTileByCoord(x, down));
    };
    if (right < 15 && this.getTileByCoord(right, y)) {
      adjacentTiles.push(this.getTileByCoord(right, y));
    };
    if (up >= 0 && this.getTileByCoord(x, up)) {
      adjacentTiles.push(this.getTileByCoord(x, up));
    };

    if(!adjacentTiles.length){
      return null;
    }
    return adjacentTiles;
  };

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
        // need to change logic for mulitpliers
        square = Object.assign(new Square, startRowArray[j][i]);
      }else{
        // Logic for multipliers here
        square = new Square();
      };
      startColumnArray.push(square);
    };

    // need to change logic for mulitpliers
    const correctColumnArray = startColumnArray.map(square => Object.assign(new Square, square));
    startColumnArray.reverse()
    correctColumnArray.push(mirrorLineArray[i]);
    const columnArray = correctColumnArray.concat(startColumnArray);
    // console.log(columnArray.length);

    startRowArray.push(columnArray);
  };

  const correctRowArray = startRowArray.map(row => row.map(square => Object.assign(new Square, square)));
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
