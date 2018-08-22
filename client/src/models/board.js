const Square = require('./square.js');

class Board {
  constructor() {
    this.squares = createSquares();
  };

  getSquareByCoord(coordinates) {
    const x = coordinates.x;
    const y = coordinates.y;
    return this.squares[y][x];
  }

  getTileByCoord(coordinates) {
    const square = this.getSquareByCoord(coordinates);
    return square.tile;
  };

  addTileByCoord(tile, coordinates) {
    const square = this.getSquareByCoord(coordinates);
    square.tile = tile;
  };

  removeTileByCoord(coordinates) {
    const square = this.getSquareByCoord(coordinates);
    square.tile = null;
  };

  getSquareValueByCoord(coordinates) {
    const square = this.getSquareByCoord(coordinates);
    return square.getTileValue();
  };

  getTileBefore(directionKey, coordinates) {
    const coord = getAdjacentTileCoord(-1, directionKey, coordinates);
    if(coord !== null){
      const tile = this.getSquareByCoord(coord).tile;
      if(tile !== null){
        return {tile: tile, coord: coord};
      };
    };
    return null;
  };

  getTileAfter(directionKey, coordinates) {
    const coord = getAdjacentTileCoord(1, directionKey, coordinates);
    if(coord !== null){
      const tile = this.getSquareByCoord(coord).tile;
      if(tile !== null){
        return {tile: tile, coord: coord}
      };
    };
    return null;
  };

  getAdjacentTiles(coordinates) {
    const adjacentTiles = [];

    const topTile = this.getTileBefore(`y`, coordinates);
    const rightTile = this.getTileAfter(`x`, coordinates);
    const bottomTile = this.getTileAfter(`y`, coordinates);
    const leftTile = this.getTileBefore(`x`, coordinates);

    if(topTile !== null){adjacentTiles.push(topTile)};
    if(rightTile !== null){adjacentTiles.push(rightTile)};
    if(bottomTile !== null){adjacentTiles.push(bottomTile)};
    if(leftTile !== null){adjacentTiles.push(leftTile)};

    // if(adjacentTiles.length === 0){return null};
    return adjacentTiles;
  };

};

module.exports = Board;

function createSquares() {
  let row0 = [];
  let row1 = [];
  let row2 = [];
  let row3 = [];
  let row4 = [];
  let row5 = [];
  let row6 = [];
  let row7 = [];
  let row8 = [];
  let row9 = [];
  let row10 = [];
  let row11 = [];
  let row12 = [];
  let row13 = [];
  let row14 = [];

  addSquaresToRow(row0, ['w3','s','s','l2','s','s','s','w3','s','s','s','l2','s','s','w3']);
  addSquaresToRow(row1, ['s','w2','s','s','s','l3','s','s','s','l3','s','s','s','w2','s']);
  addSquaresToRow(row2, ['s','s','w2','s','s','s','l2','s','l2','s','s','s','w2','s','s']);
  addSquaresToRow(row3, ['l2','s','s','w2','s','s','s','l2','s','s','s','w2','s','s','l2']);
  addSquaresToRow(row4, ['s','s','s','s','w2','s','s','s','s','s','w2','s','s','s','s']);
  addSquaresToRow(row5, ['s','w3','s','s','s','w3','s','s','s','w3','s','s','s','w3','s']);
  addSquaresToRow(row6, ['s','s','l2','s','s','s','l2','s','l2','s','s','s','l2','s','s']);
  addSquaresToRow(row7, ['w3','s','s','l2','s','s','s','w2','s','s','s','l2','s','s','w3']);
  addSquaresToRow(row8, ['s','s','l2','s','s','s','l2','s','l2','s','s','s','l2','s','s']);
  addSquaresToRow(row9, ['s','w3','s','s','s','w3','s','s','s','w3','s','s','s','w3','s']);
  addSquaresToRow(row10, ['s','s','s','s','w2','s','s','s','s','s','w2','s','s','s','s']);
  addSquaresToRow(row11, ['l2','s','s','w2','s','s','s','l2','s','s','s','w2','s','s','l2']);
  addSquaresToRow(row12, ['s','s','w2','s','s','s','l2','s','l2','s','s','s','w2','s','s']);
  addSquaresToRow(row13, ['s','w2','s','s','s','w3','s','s','s','w3','s','s','s','w2','s']);
  addSquaresToRow(row14, ['w3','s','s','l2','s','s','s','w3','s','s','s','l2','s','s','w3']);

  const rows = [row0, row1, row2, row3, row4, row5, row6, row7, row8, row9, row10, row11, row12, row13, row14];

  return rows;
};

function addSquare(row) {
  const square = new Square();
  row.push(square);
};

function addLetterMultiplierSquare(row, multiplier) {
  let square = new Square();
  square.letterMultiplier = multiplier;
  row.push(square);
};

function addWordMultiplierSquare(row, multiplier) {
  let square = new Square();
  square.wordMultiplier = multiplier;
  row.push(square);
};

function addSquaresToRow(row, squares) {
  squares.forEach((square) => {
    if (square === 's') {addSquare(row);}
    else if (square === 'w3') {addWordMultiplierSquare(row, 3);}
    else if (square === 'w2') {addWordMultiplierSquare(row, 2);}
    else if (square === 'l3') {addLetterMultiplierSquare(row, 3);}
    else if (square === 'l2') {addLetterMultiplierSquare(row, 2);}
  });
};

function getAdjacentTileCoord(position, directionKey, coord) {

  if(directionKey === `x` && (coord.x + position) < 15 && (coord.x + position) >= 0){
    return {
      x: coord.x + position,
      y: coord.y
    };
  }

  if(directionKey === `y` && (coord.y + position) < 15 && (coord.y + position) >= 0){
    return {
      x: coord.x ,
      y: coord.y + position
    };
  };

  return null;
};
