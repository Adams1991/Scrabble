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

  it("should have 225 squares when made", () => {
    const result1 = board.squares.length;
    const result2 = board.squares[0].length;
    assert.strictEqual(result1, 15);
    assert.strictEqual(result2, 15);
  })

  it("should return null for given coordinates when asked to return a tile", () => {
    const result = board.getTileByCoord(3, 5);
    assert.strictEqual(result, null);
  })

});
