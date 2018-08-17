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
    if(this.tile){
      return this.tile.letter;
    }
    return null;
  };

};

module.exports = Square;
