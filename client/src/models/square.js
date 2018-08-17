class Square {
  constructor() {
    this.tile = null;
  };

  getTileValue() {
    if(this.tile){
      return this.tile.value;
    }
    return null;
  };

  getLetter() {
    return this.tile.letter;
  };

};

module.exports = Square;
