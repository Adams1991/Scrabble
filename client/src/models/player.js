const Rack = require("./rack.js");

class Player {
  constructor(name) {
    this.name = name;
    this.rack = new Rack();
    this.score = 0;
  };

  getNumberOfTilesInRack() {
    return this.rack.tiles.length;
  };

  addTileToRack(tile) {
    this.rack.addTile(tile);
  };

  addTilesToRack(tiles) {
    this.rack.addTiles(tiles);
  };

};

module.exports = Player;
