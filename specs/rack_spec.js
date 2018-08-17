const assert = require('assert');
const Tile = require('../client/src/models/tile.js');
const Rack = require('../client/src/models/rack.js');

describe("rack", () => {

  let rack;
  let tile;

  beforeEach(() => {
    tile = new Tile(`A`, 1);
    rack = new Rack();
  })

});
