const assert = require('assert');
const Tile = require('../client/src/models/tile.js');
const ActiveWord = require('../client/src/models/active_word.js');

describe("Active Word", () => {

  let tile1;
  let tile2;
  let tile3;
  let firstLocatedTile;
  let activeWord;

  beforeEach(() => {
    tile1 = new Tile("A", 1);
    tile2 = new Tile("B", 3);
    tile3 = new Tile("E", 1);
    tile4 = new Tile("U", 1);
    firstLocatedTile = {tile: tile1, coord: {x:0, y:12}}
    secondLocatedTile = {tile: tile2, coord: {x:0, y:13}}
    thirdLocatedTile = {tile: tile3, coord: {x:0, y:14}}
    fourthLocatedTile = {tile: tile4, coord: {x:1, y:14}}
    activeWord = new ActiveWord(firstLocatedTile, secondLocatedTile);
  });

  it("should start with calculating direction", () => {
    const result = activeWord.direction;
    assert.deepStrictEqual(result, {x:0});
  });

  it("should be able to have tile added that has correct direction", () => {
    const result1 =activeWord.addTile(thirdLocatedTile);
    const result2 = activeWord.tiles.length;
    assert.deepStrictEqual(result1, true);
    assert.deepStrictEqual(result2, 3);
  })

  it("should be not able to have tile added that has incorrect direction", () => {
    const result1 = activeWord.addTile(fourthLocatedTile);
    const result2 = activeWord.tiles.length;
    assert.deepStrictEqual(result1, false);
    assert.deepStrictEqual(result2, 2);
  })

});
