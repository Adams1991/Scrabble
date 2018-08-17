const assert = require('assert');
const Player = require('../client/src/models/player.js');
const Tile = require('../client/src/models/tile.js');

describe("Player", () => {

  let player;
  let tile1;
  let tile2;
  let tile3;


  beforeEach(() => {
    player = new Player("Wellington");
    tile1 = new Tile("A", 1);
    tile2 = new Tile("B", 3);
    tile3 = new Tile("D", 2);
  });

  it("should have a name", () => {
    assert.deepStrictEqual(player.name, "Wellington");
  });

  it("should start with empty rack", () => {
    assert.deepStrictEqual(player.rack.tiles.length, 0);
  });

  it("should start with no score", () => {
    assert.deepStrictEqual(player.score, 0)
  });

  it("should be able to receive tile", () => {
    player.getTile(tile1);
    assert.deepStrictEqual(player.rack.tiles.length, 1);
    assert.deepStrictEqual(player.rack.tiles[0].letter, "A");
  });

});
