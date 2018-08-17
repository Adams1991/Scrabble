const assert = require('assert');
const Tile = require('../client/src/models/tile.js');
const Board = require('../client/src/models/board.js');

describe("Board", () => {

  let board;
  let tile;

  beforeEach(() => {

    board = new Board();
    tile = new Tile(`A`, 1);

  });

  it("should have 15 x 15 squares when made", () => {
    const result1 = board.squares.length;
    const result2 = board.squares[0].length;
    assert.strictEqual(result1, 15);
    assert.strictEqual(result2, 15);
  });

  it("should return null for given coordinates when asked to return a tile", () => {
    const result = board.getTileByCoord(3, 5);
    assert.strictEqual(result, null);
  });

  it("should be able to add a tile by coordinates", () => {
    board.addTileByCoord(tile, 3, 5);
    const result = board.getTileByCoord(3, 5);
    assert.deepStrictEqual(result, tile);
  });

  it("should be able to remove a tile by coordinates", () => {
    board.addTileByCoord(tile, 3, 5);
    board.removeTileByCoord(3, 5);
    const result = board.getTileByCoord(3, 5);
    assert.strictEqual(result, null);
  });

  it("should be able to get a squares value for a given coordinate", () => {
    board.addTileByCoord(tile, 3, 5);
    const result1 = board.getSquareValueByCoord(3, 5);
    const result2 = board.getSquareValueByCoord(10, 4);
    assert.strictEqual(result1, 1);
    assert.strictEqual(result2, 0);
  });

  it("should return null if there are no tiles in squares adjacent to a given square", () => {
    const result = board.getAdjacentTiles(3, 5);
    assert.deepStrictEqual(result, null);
  });

  it("should return array of adjacent tiles for a given square if tiles are adjacent", () => {
    board.addTileByCoord(tile, 3, 5);
    const result = board.getAdjacentTiles(4, 5);
    assert.deepStrictEqual(result, [tile]);
  });

});
