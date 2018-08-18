const assert = require('assert');
const Tile = require('../client/src/models/tile.js');
const ActiveWord = require('../client/src/models/active_word.js');

describe("Active Word", () => {

  let tile1;
  let tile2;
  let firstLocatedTile;
  let activeWord;

  beforeEach(() => {
    tile1 = new Tile("A", 1);
    tile2 = new Tile("B", 3);
    firstLocatedTile = {tile: tile1, coord: {x:0, y:12}}
    secondLocatedTile = {tile: tile2, coord: {x:0, y:13}}
    activeWord = new ActiveWord(firstLocatedTile, secondLocatedTile);
  });
