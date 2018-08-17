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


};

module.exports = Rack;
