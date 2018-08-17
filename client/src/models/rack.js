class Rack {
  constructor() {
    this.tiles = []
  };

  addTile(tile){
    this.tiles.push(tile);
  };

  getTileByIndex(index){
    return this.tiles[index]
  }

  removeTileByIndex(index){
    this.tiles.splice(index, 1);
  }


};

module.exports = Rack;
