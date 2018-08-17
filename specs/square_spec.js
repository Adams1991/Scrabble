const assert = require('assert');
const Square = require('../client/src/models/square.js');

describe("Square", () => {

  let square;

  beforeEach(() => {
    square = new Square();
  })

  it("should start without a tile", () => {
    const result = square.tile;
    assert.strictEqual(result, null);
  })

});
