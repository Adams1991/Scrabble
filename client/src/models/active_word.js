class ActiveWord {
  constructor(firstLocatedTile, secondLocatedTile) {
    this.direction = calculateDirection(firstLocatedTile.coord, secondLocatedTile.coord);
    if (this.direction === null){
      this.tiles = null;
    }else {
      this.tiles = [firstLocatedTile];
      if(!this.addTile(secondLocatedTile)){
        this.direction = null;
        this.tiles = null;
      };
    }
  }


  addTile(tilePlaced) {
    const firstTile = this.tiles[0];
    const lastTile = this.tiles[this.tiles.length -1];
    const directionKey = Object.keys(this.direction)[0];
    const searchDirection = otherDirection(directionKey);
    const beforeCoord = firstTile.coord[searchDirection] -1;
    const afterCoord = lastTile.coord[searchDirection] +1;
    if(tilePlaced.coord[directionKey] === this.direction[directionKey]){
      if(tilePlaced.coord[searchDirection] === beforeCoord){
        this.tiles.unshift(tilePlaced);
        return true;
      };
      if(tilePlaced.coord[searchDirection] === afterCoord){
        this.tiles.push(tilePlaced);
        return true;
      };
    };
    return false;
  };

  getWord(){
    const completeWord = this.tiles.reduce((word, placedTile) => {
      const letter = placedTile.tile.letter;
      return word + letter
    }, "")
    return completeWord;
  }

  getWordScore(){
    const completeWordScore = this.tiles.reduce((wordScore, placedTile) => {
      const tileScore = placedTile.tile.value;
      return wordScore + tileScore
    }, 0)
    return completeWordScore;
  }

  containsTile(tilePlaced){
    for(let tile of this.tiles){
      if(tilePlaced.coord.x === tile.coord.x && tilePlaced.coord.y === tile.coord.y && tilePlaced.tile.letter === tile.tile.letter){
        return true;
      }
    };
    return false;
  };

}

module.exports = ActiveWord;


function otherDirection(directionKey) {
  if(directionKey === "x"){
    return "y";
  }else{
    return "x";
  }
}


function calculateDirection(firstCoord, secondCoord){
  let direction = null;
  if(firstCoord.x === secondCoord.x){
    direction = { x: firstCoord.x}
  } else if(firstCoord.y === secondCoord.y){
    direction = { y: firstCoord.y}
  }
  return direction;
};

/// Not in use
function checkInLine(tilePlaced, direction) {
  const directionKey = Object.keys(direction)[0];
  const tileCoordToCheck = tilePlaced.coord[directionKey]
  if(tileCoordToCheck === direction[directionKey]){
    return true;
  } else {
    return false;
  }
}
