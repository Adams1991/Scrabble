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
    player.addTileToRack(tile1);
    assert.deepStrictEqual(player.getNumberOfTilesInRack(), 1);
    assert.deepStrictEqual(player.rack.tiles[0].letter, "A");
  });

  it("should be able to receive tiles", () => {
    player.addTilesToRack([tile2, tile3]);
    assert.deepStrictEqual(player.getNumberOfTilesInRack(), 2);
    assert.deepStrictEqual(player.rack.tiles[0].letter, "B");
    assert.deepStrictEqual(player.rack.tiles[1].value, 2);
  });

  it("should be able to get tile in rack by index", () => {
    player.addTilesToRack([tile1, tile2, tile3]);
    assert.deepStrictEqual(player.getTileInRackByIndex(1), tile2);
  });

  it("should be able to remove tile from rack by index", () => {
    player.addTilesToRack([tile1, tile2, tile3]);
    player.removeTileFromRackByIndex(1);
    assert.deepStrictEqual(player.getTileInRackByIndex(1), tile3);
  });

  it("should be able to add points to score", () => {
    player.addToScore(16);
    assert.deepStrictEqual(player.score, 16);
    player.addToScore(22);
    assert.deepStrictEqual(player.score, 38);
  });

  it("should be able to subtract points from score", () => {
    player.addToScore(324);
    player.subtractFromScore(3);
    assert.deepStrictEqual(player.score, 321);
  });

});
