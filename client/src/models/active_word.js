class ActiveWord {
  constructor(firstLocatedTile, secondLocatedTile) {
    this.tiles = [firstLocatedTile.tile, secondLocatedTile.tile];
    this.direction = calculateDirection(firstLocatedTile.coord, secondLocatedTile.coord);
  }

  addTile(tilePlaced){
    const direction = Object.keys(this.direction)[0];
    const tileCoordToCheck = tilePlaced.coord[direction]
    if(tileCoordToCheck === this.direction[direction]){
      this.tiles.push(tilePlaced);
      return true;
    } else {
      return false;
    }
  }


}

module.exports = ActiveWord;

function calculateDirection(firstCoord, secondCoord){
  let direction = 0;
  if(firstCoord.x === secondCoord.x){
    direction = { x: firstCoord.x}
  } else {
    direction = { y: firstCoord.y}
  }
  return direction;
};
