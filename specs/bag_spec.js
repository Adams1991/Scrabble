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

  it("should be able to receive tiles", () => {
    bag.addTile(tile1);
    bag.addTiles([tile2, tile3]);
    const result = bag.tiles;
    assert.deepStrictEqual(result, [tile1, tile2, tile3]);
  });

  it("should be able to receive new tile", () => {
    bag.addNewTile("E", 1);
    const result = bag.tiles;
    const tile = new Tile("E", 1);
    assert.deepStrictEqual(bag.tiles.length, 1);
    assert.deepStrictEqual(bag.tiles[0].value, 1);
    assert.deepStrictEqual(bag.tiles[0].letter, "E");
    assert.deepStrictEqual(result, [tile]);
  });

  it("should be able to receive new tiles", () => {
    bag.addNewTiles("F", 4, 2);
    const result = bag.tiles;
    const tile1 = new Tile("F", 4);
    const tile2 = new Tile("F", 4);
    const tiles = [tile1, tile2];
    assert.deepStrictEqual(bag.tiles.length, 2);
    assert.deepStrictEqual(bag.tiles[0].value, 4);
    assert.deepStrictEqual(bag.tiles[1].letter, "F");
    assert.deepStrictEqual(result, tiles);
  });

  it("can be filled", () => {
    bag.fill();
    assert.deepStrictEqual(bag.tiles.length, 100);
    assert.deepStrictEqual(bag.tiles[98].value, 0);
    assert.deepStrictEqual(bag.tiles[50].letter, "L");
  });

  it("can return random tiles", () => {
    bag.fill();
    const result = bag.getRandomTiles(7);
    assert.deepStrictEqual(result.length, 7);
    assert.deepStrictEqual(bag.tiles.length, 100);
  });

  it("can remove random tile", () => {
    bag.fill();
    const tile = bag.removeRandomTile()[0];
    assert.deepStrictEqual(bag.tiles.length, 99);
  });

  it("can remove random tiles", () => {
    bag.fill();
    const tiles = bag.removeRandomTiles(7);
    assert.deepStrictEqual(bag.tiles.length, 93);
    assert.deepStrictEqual(tiles.length, 7);
  });

});
