const assert = require('assert');
const Tile = require('../client/src/models/tile.js');

describe("Tile", () => {

  let tile;

  beforeEach(() => {
    tile = new Tile("A", 1);
  })

  it("should be able to get letter", () => {
    const result = tile.letter;
    assert.strictEqual(result, "A");
  })

});
