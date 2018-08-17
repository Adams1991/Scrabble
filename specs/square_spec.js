const assert = require('assert');
const Square = require('../client/src/models/square.js');
const Tile = require('../client/src/models/tile.js');

describe("Square", () => {

  let square;
  let tile;

  beforeEach(() => {
    tile = new Tile(`A`, 1);
    square = new Square();
  })

  it("should start without a tile", () => {
    const result = square.tile;
    assert.strictEqual(result, null);
  });

  it("should be able to set square to have a tile", () => {
    square.tile = tile;
    const result = square.tile;
    assert.deepStrictEqual(result, tile);
  });

  it("should return 0 for value of an empty square", () => {
    const result = square.getTileValue();
    assert.strictEqual(result, 0);
  });

  it("should return the tile value of a populated square", () => {
    square.tile = tile;
    const result = square.getTileValue();
    assert.strictEqual(result, 1);
  })

  it("should return null for letter of an empty square", () => {
    const result = square.getLetter();
    assert.strictEqual(result, null);
  });

  it("should return the tile letter of a populated square", () => {
    square.tile = tile;
    const result = square.getLetter();
    assert.strictEqual(result, `A`);
  })

  it("should be able to remove tile and return the tile", () => {
    square.tile = tile;
    const result = square.removeTile();
    assert.deepStrictEqual(result, tile);
    assert.strictEqual(square.tile, null);
  })

});
