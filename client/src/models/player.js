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

  getTileInRackByIndex(index) {
    return this.rack.getTileByIndex(index);
  };

  removeTileFromRackByIndex(index) {
    this.rack.removeTileByIndex();
  };

};

module.exports = Player;
