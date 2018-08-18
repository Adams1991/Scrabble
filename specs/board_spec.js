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

  it("should return null if there are no tiles in squares adjacent to a given square", () => {
    const result = board.getAdjacentTiles({x: 3, y: 5});
    assert.deepStrictEqual(result, null);
  });

  it("should return array of adjacent tiles for a given square if tiles are adjacent", () => {
    board.addTileByCoord(tile1, {x: 3, y: 5});
    board.addTileByCoord(tile2, {x: 4, y: 6});

    const result = board.getAdjacentTiles({x: 4, y: 5});
    assert.deepStrictEqual(
      result,
      [{
        tile: tile2,
        coord: {x: 4, y: 6}
      },
      {
        tile: tile1,
        coord: {x: 3, y: 5}
      }]
    );
  });

  it("should be able to check edge squares for adjacent tiles", () => {
    board.addTileByCoord(tile1, {x: 0, y: 1});
    board.addTileByCoord(tile2, {x: 14, y: 1});
    board.addTileByCoord(tile3, {x: 13, y: 14});
    board.addTileByCoord(tile4, {x: 1, y: 14});

    const result1 = board.getAdjacentTiles({x: 0, y: 0});
    const result2 = board.getAdjacentTiles({x: 14, y: 0});
    const result3 = board.getAdjacentTiles({x: 14, y: 14});
    const result4 = board.getAdjacentTiles({x: 0, y: 14});

    assert.deepStrictEqual(
      result1,
      [{
        tile: tile1,
        coord: {x: 0, y: 1}
      }]
    );
    assert.deepStrictEqual(
      result2,
      [{
        tile: tile2,
        coord: {x: 14, y: 1}
      }]
    );
    assert.deepStrictEqual(
      result3,
      [{
        tile: tile3,
        coord: {x: 13, y: 14}
      }]
    );
    assert.deepStrictEqual(
      result4,
      [{
        tile: tile4,
        coord: {x: 1, y: 14}
      }]
    );
  });

  it("should be able to get the content of the square adjecent given a square and direction", () => {
    board.addTileByCoord(tile1, {x: 1, y: 0});
    board.addTileByCoord(tile2, {x: 0, y: 1});

    const result1 = board.getTileBefore(`x`, {x: 2, y: 0});
    const result2 = board.getTileBefore(`y`, {x: 1, y: 1});
    const result3 = board.getTileAfter(`y`, {x: 0, y: 0});
    const result4 = board.getTileAfter(`x`, {x: 0, y: 0});
    assert.deepStrictEqual(
      result1,
      {
        tile: tile1,
        coord: {x: 1, y: 0}
      }
    );
    assert.deepStrictEqual(
      result2,
      {
        tile: tile1,
        coord: {x: 1, y: 0}
      }
    );
    assert.deepStrictEqual(
      result3,
      {
        tile: tile2,
        coord: {x: 0, y: 1}
      }
    );
    assert.deepStrictEqual(
      result4,
      {
        tile: tile1,
        coord: {x: 1, y: 0}
      }
    );
  });

});
