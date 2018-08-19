const assert = require('assert');
const Tile = require('../client/src/models/tile.js');
const ActiveWord = require('../client/src/models/active_word.js');

describe("Active Word", () => {

  let tile1;
  let tile2;
  let tile3;
  let tile4;
  let tile5;
  let firstLocatedTile;
  let secondLocatedTile;
  let thirdLocatedTile;
  let fourthLocatedTile;
  let fifthLocatedTile;
  let activeWord1;

  beforeEach(() => {
    tile1 = new Tile("A", 1);
    tile2 = new Tile("B", 3);
    tile3 = new Tile("E", 1);
    tile4 = new Tile("U", 1);
    tile4 = new Tile("I", 1);
    firstLocatedTile = {tile: tile1, coord: {x:0, y:11}}
    secondLocatedTile = {tile: tile2, coord: {x:0, y:12}}
    thirdLocatedTile = {tile: tile3, coord: {x:0, y:13}}
    fourthLocatedTile = {tile: tile4, coord: {x:1, y:13}}
    fifthLocatedTile = {tile: tile5, coord: {x:0, y:9}}
    activeWord1 = new ActiveWord(firstLocatedTile, secondLocatedTile);
  });

  it("should start with calculating direction", () => {
    const result = activeWord1.direction;
    assert.deepStrictEqual(result, {x:0});
  });

  it("should return null if the second tile isn't in a valid position", () => {
    const activeWord2 = new ActiveWord(firstLocatedTile, thirdLocatedTile);
    const activeWord3 = new ActiveWord(firstLocatedTile, fourthLocatedTile);
    assert.deepStrictEqual(activeWord2.direction, null);
    assert.deepStrictEqual(activeWord2.tiles, null);
    assert.deepStrictEqual(activeWord3.direction, null);
    assert.deepStrictEqual(activeWord3.tiles, null);
  })

  it("should be able to have tile added that has correct direction", () => {
    const result1 =activeWord1.addTile(thirdLocatedTile);
    const result2 = activeWord1.tiles.length;
    assert.deepStrictEqual(result1, true);
    assert.deepStrictEqual(result2, 3);
  });

  it("should be not able to have tile added that doesn't join the active word", () => {
    const result1 = activeWord1.addTile(fourthLocatedTile);
    const result2 = activeWord1.addTile(fifthLocatedTile);
    const result3 = activeWord1.tiles.length;
    assert.deepStrictEqual(result1, false);
    assert.deepStrictEqual(result2, false);
    assert.deepStrictEqual(result3, 2);
  });

  it("should be able to get word as string", () => {
    const result = activeWord1.getWord();
    assert.deepStrictEqual(result, "AB");
  });

  it("should be able to get wordScore", () => {
    const result = activeWord1.getWordScore();
    assert.deepStrictEqual(result, 4);
  });



});
