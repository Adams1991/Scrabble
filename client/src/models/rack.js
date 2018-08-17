class Rack {
  constructor() {
    this.tiles = []
  };

  addTile(tile){
    this.tiles.push(tile);
  };

  addTiles(tiles){
    const newTiles = this.tiles.concat(tiles);
    this.tiles = newTiles;
  }

  getTileByIndex(index){
    return this.tiles[index]
  };

  removeTileByIndex(index){
    this.tiles.splice(index, 1);
  };


};

module.exports = Rack;
