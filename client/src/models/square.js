class Square {
  constructor() {
    this.tile = null;
  };

  getTileValue() {
    return this.tile.value;
  };

  getLetter() {
    return this.tile.letter;
  };

};

module.exports = Square;
