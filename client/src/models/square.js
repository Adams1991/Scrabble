class Square {
  constructor() {
    this.tile = null;
    this.letterMultiplier = null;
    this.wordMultiplier = null;
  };

  getTileValue() {
    if(this.tile){
      return this.tile.value;
    }
    return 0;
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
