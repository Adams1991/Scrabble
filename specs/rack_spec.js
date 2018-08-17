const assert = require('assert');
const Tile = require('../client/src/models/tile.js');
const Rack = require('../client/src/models/rack.js');

describe("Rack", () => {

  let rack;
  let tile;

  beforeEach(() => {
    tile = new Tile(`A`, 1);
    rack = new Rack();
  })

  it("should start without any tiles", () => {
    const result = rack.tiles;
    assert.deepStrictEqual(result, []);
  });

  it("should be able to add a tile", () => {
    rack.addTile(tile);
    const result = rack.tiles.length;
    assert.deepStrictEqual(result, 1);
  });

  it("should be able to get tile by index", () => {
    rack.addTile(tile);
    const result = rack.getTileByIndex(0);
    assert.deepStrictEqual(result, tile);
  })

  it("should be able to remove tile by index", () => {
    rack.addTile(tile);
    rack.removeTileByIndex(0);
    const result = rack.tiles.length;
    assert.deepStrictEqual(result, 0);
  })

});
