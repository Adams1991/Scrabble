const Rack = require("./rack.js");

class Player {
  constructor(name) {
    this.name = name;
    this.rack = new Rack();
    this.score = 0;
  };

  getTile(tile) {
    this.rack.addTile(tile);
  };

};

module.exports = Player;
