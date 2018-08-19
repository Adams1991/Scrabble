const assert = require('assert');
const Tile = require('../client/src/models/tile.js');
const Bag = require('../client/src/models/bag.js');

describe("Bag", () => {

  let tile1;
  let tile2;
  let tile3;
  let bag;

  beforeEach(() => {
    tile1 = new Tile("A", 1);
    tile2 = new Tile("B", 3);
    tile3 = new Tile("D", 2);
    bag = new Bag();
  });

  it("should be able to receive tile", () => {
    bag.removeRandomTiles(100);
    bag.addTile(tile1);
    const result = bag.tiles;
    assert.deepStrictEqual(result, [tile1]);
  });

  it("should be able to receive tiles", () => {
    bag.removeRandomTiles(100);
    bag.addTile(tile1);
    bag.addTiles([tile2, tile3]);
    const result = bag.tiles;
    assert.deepStrictEqual(result, [tile1, tile2, tile3]);
  });

  it("should be full on creation", () => {
    assert.deepStrictEqual(bag.tiles.length, 100);
    assert.deepStrictEqual(bag.getNumberOfTiles(), 100);
    assert.deepStrictEqual(bag.tiles[98].value, 0);
    assert.deepStrictEqual(bag.tiles[50].letter, "L");
  });

  it("should be able to remove random tile", () => {
    const tile = bag.removeRandomTile()[0];
    assert.deepStrictEqual(bag.tiles.length, 99);
    assert.deepStrictEqual(bag.getNumberOfTiles(), 99);
  });

  it("should be able to remove random tiles", () => {
    const tiles = bag.removeRandomTiles(7);
    assert.deepStrictEqual(bag.tiles.length, 93);
    assert.deepStrictEqual(bag.getNumberOfTiles(), 93);
    assert.deepStrictEqual(tiles.length, 7);
  });

  it("should return the remaining tiles in the bag if asked for more than is left", () => {
    const tiles = bag.removeRandomTiles(101);
    const result = tiles.length;
    assert.strictEqual(result, 100);
  });

});
