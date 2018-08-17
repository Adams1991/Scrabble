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

  it("should start with no tiles", () => {
    const result = bag.tiles.length;
    assert.strictEqual(result, 0);
  });

  it("should be able to receive tile", () => {
    bag.addTile(tile1);
    const result = bag.tiles;
    assert.deepStrictEqual(result, [tile1]);
  });

});
