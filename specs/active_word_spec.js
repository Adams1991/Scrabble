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
    firstLocatedTile = {tile: tile1, coord: {x:0, y:12}}
    secondLocatedTile = {tile: tile2, coord: {x:0, y:13}}
    thirdLocatedTile = {tile: tile3, coord: {x:0, y:14}}
    activeWord = new ActiveWord(firstLocatedTile, secondLocatedTile);
  });

  it("should start with calculating direction", () => {
    const result = activeWord.direction;
    assert.deepStrictEqual(result, {x:0});
  });

  it("should be able to have tile added that has correct direction", () => {
    activeWord.addTile(thirdLocatedTile);
    const result = activeWord.tiles.length;
    assert.deepStrictEqual(result, 3);
  })

});
