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






});
