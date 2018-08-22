const Tile = require("./tile.js");

class Bag {
  constructor() {
    this.tiles = [];
    this.addNewTiles('A', 1, 11);
    this.addNewTiles('B', 3, 2);
    this.addNewTiles('C', 3, 2);
    this.addNewTiles('D', 2, 4);
    this.addNewTiles('E', 1, 12);
    this.addNewTiles('F', 4, 2);
    this.addNewTiles('G', 2, 3);
    this.addNewTiles('H', 4, 2);
    this.addNewTiles('I', 1, 9);
    this.addNewTiles('J', 8, 1);
    this.addNewTiles('K', 5, 1);
    this.addNewTiles('L', 1, 4);
    this.addNewTiles('M', 3, 2);
    this.addNewTiles('N', 1, 6);
    this.addNewTiles('O', 1, 8);
    this.addNewTiles('P', 3, 2);
    this.addNewTiles('Q', 10, 1);
    this.addNewTiles('R', 1, 6);
    this.addNewTiles('S', 1, 4);
    this.addNewTiles('T', 1, 6);
    this.addNewTiles('U', 1, 4);
    this.addNewTiles('V', 4, 2);
    this.addNewTiles('W', 4, 2);
    this.addNewTiles('X', 8, 1);
    this.addNewTiles('Y', 4, 2);
    this.addNewTiles('Z', 10, 1);
    // this.addNewTiles('', 0, 2);
  };

  getNumberOfTiles() {
    return this.tiles.length;
  };

  addTile(tile) {
    this.tiles.push(tile);
  };

  addTiles(tiles) {
    tiles.forEach ((tile) => {
      this.addTile(tile);
    });
  };

  addNewTile(letter, value) {
    const newTile = new Tile(letter, value);
    this.addTile(newTile);
  };

  addNewTiles(letter, value, quantity) {
    for (let i=1; i<=quantity; i++) {
      this.addNewTile(letter, value)
    };
  };

  removeRandomTile() {
    const numberOfTiles = this.tiles.length;
    const randomNumber = Math.floor(numberOfTiles*Math.random());
    return this.tiles.splice(randomNumber, 1)[0];
  };

  removeRandomTiles(quantity) {
    const tiles = [];
    if(quantity >= this.tiles.length){
      this.tiles.forEach(tile => tiles.push(tile));
      this.tiles = [];
    } else {
      for (let i=1; i<=quantity; i++) {
        const numberOfTiles = this.tiles.length;
        const randomNumber = Math.floor(numberOfTiles*Math.random());
        const tile = this.tiles.splice(randomNumber, 1)[0];
        tiles.push(tile);
      };
    };
    return tiles;
  };

};

module.exports = Bag;
