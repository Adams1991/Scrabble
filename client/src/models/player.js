const Rack = require("./rack.js");
const Bag = require("./bag.js");

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

  addToScore(points) {
    this.score += points;
  };

  subtractFromScore(points) {
    this.score -= points;
  };

  getTilesFromBag(quantity, bag) {
    const tiles = bag.removeRandomTiles(quantity);
    this.addTilesToRack(tiles);
  };

  // swapTiles(tiles, bag) {
  //   this.removeTilesFromRack(tiles);
  //   this.getTilesFromBag(tiles.length, bag);
  //   bag.addTiles(tiles);
  // };

};

module.exports = Player;
