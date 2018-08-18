class ActiveWord {
  constructor(firstLocatedTile, secondLocatedTile) {
    this.tiles = [firstLocatedTile.tile, secondLocatedTile.tile];
    this.direction = calculateDirection(firstLocatedTile.coord, secondLocatedTile.coord);
  }
  
}
