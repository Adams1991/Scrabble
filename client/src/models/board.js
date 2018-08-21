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

    if(adjacentTiles.length === 0){return null};
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
    correctColumnArray.push(Object.assign(new Square, mirrorLineArray[i]));
    const columnArray = correctColumnArray.concat(startColumnArray);

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
