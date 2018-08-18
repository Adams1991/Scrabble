class ActiveWord {
  constructor(firstLocatedTile, secondLocatedTile) {
    this.tiles = [firstLocatedTile.tile, secondLocatedTile.tile];
    console.log(firstLocatedTile.coord);
    this.direction = calculateDirection(firstLocatedTile.coord, secondLocatedTile.coord);
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
