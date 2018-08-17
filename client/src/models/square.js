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

  removeTile() {
    const tile = this.tile;
    this.tile = null;
    return tile;
  }

};

module.exports = Square;
