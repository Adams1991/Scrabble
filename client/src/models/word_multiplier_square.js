const Square = require('./square.js');

class WordMultiplierSquare extends Square {
  constructor(mulitplier) {
    super();
    this.mulitplier = mulitplier;
  };

  multiplyWord(word){
    return word.getWordScore() * this.mulitplier;
  };

}
