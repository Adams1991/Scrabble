const Square = require('./square.js');

class LetterMultiplierSquare extends Square {
  constructor(mulitplier) {
    super();
    this.mulitplier = mulitplier;
  };

  getValue(){
    return super.getTileValue * this.mulitplier;
  }

}
