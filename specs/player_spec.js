const assert = require('assert');
const Player = require('../client/src/models/player.js');
// const Rack = require('../client/src/models/rack.js');

describe("Player", () => {

  // let rack;
  let player;

  beforeEach(() => {
    player = new Player("Wellington");
  });

  it("should have a name", () => {
    assert.deepStrictEqual(player.name, "Wellington");
  });

});
