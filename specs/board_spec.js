const assert = require('assert');
const Tile = require('../client/src/models/tile.js');
const Board = require('../client/src/models/board.js');

describe("Board", () => {

  let board;
  let tile;

  beforeEach(() => {

    board = new Board();
    tile1 = new Tile(`A`, 1);
    tile2 = new Tile(`E`, 1);
    tile3 = new Tile(`I`, 1);
    tile4 = new Tile(`O`, 1);

  });

  it("should have 15 x 15 squares when made", () => {
    const result1 = board.squares.length;
    const result2 = board.squares[0].length;
    assert.strictEqual(result1, 15);
    assert.strictEqual(result2, 15);
  });

  it("should return null for given coordinates when asked to return a tile", () => {
    const result = board.getTileByCoord({x: 3, y: 5});
    assert.strictEqual(result, null);
  });

  it("should be able to add a tile by coordinates", () => {
    board.addTileByCoord(tile1, {x: 3, y: 5});
    const result = board.getTileByCoord({x: 3, y: 5});
    assert.deepStrictEqual(result, tile1);
  });

  it("should be able to remove a tile by coordinates", () => {
    board.addTileByCoord(tile1, {x: 3, y: 5});
    board.removeTileByCoord({x: 3, y: 5});
    const result = board.getTileByCoord({x: 3, y: 5});
    assert.strictEqual(result, null);
  });

  it("should be able to get a squares value for a given coordinate", () => {
    board.addTileByCoord(tile1, {x: 3, y: 5});
    const result1 = board.getSquareValueByCoord({x: 3, y: 5});
    const result2 = board.getSquareValueByCoord({x: 10, y: 4});
    assert.strictEqual(result1, 1);
    assert.strictEqual(result2, 0);
  });

  // it("should return null if there are no tiles in squares adjacent to a given square", () => {
  //   const result = board.getAdjacentTiles(3, 5);
  //   assert.deepStrictEqual(result, null);
  // });

  // it("should return array of adjacent tiles for a given square if tiles are adjacent", () => {
  //   board.addTileByCoord(tile1, 3, 5);
  //   board.addTileByCoord(tile2, 4, 6);
  //   const result = board.getAdjacentTiles(4, 5);
  //   assert.deepStrictEqual(result, [tile1, tile2]);
  // });

  // it("should be able to check edge squares for adjacent tiles", () => {
  //   board.addTileByCoord(tile1, 0, 1);
  //   board.addTileByCoord(tile2, 14, 1);
  //   board.addTileByCoord(tile3, 13, 14);
  //   board.addTileByCoord(tile4, 1, 14);
  //
  //
  //   const result1 = board.getAdjacentTiles(0, 0);
  //   const result2 = board.getAdjacentTiles(14, 0);
  //   const result3 = board.getAdjacentTiles(14, 14);
  //   const result4 = board.getAdjacentTiles(0, 14);
  //
  //   assert.deepStrictEqual(result1, [tile1]);
  //   assert.deepStrictEqual(result2, [tile2]);
  //   assert.deepStrictEqual(result3, [tile3]);
  //   assert.deepStrictEqual(result4, [tile4]);
  // });

  it("should be able to get the content of the square adjecent given a square and direction", () => {
    board.addTileByCoord(tile1, 3, 5);
    const result = board.getTileBefore(`x`, 2, 5);
    assert.deepStrictEqual(result, tile1);
  })

});
