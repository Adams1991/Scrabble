class Bag {
  constructor() {
  this.tiles = [];
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
    for (i=1; i<=quantity; i++) {
      this.addNewTile(letter, value)
    };
  };

  fill() {
    this.addNewTiles('A', 1, 9);
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
    this.addNewTiles('', 0, 2);
  };

};

module.exports = Bag;
