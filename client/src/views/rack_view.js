const Rack = require("../models/rack.js");
// below bag just for testing.
const Bag = require("../models/bag.js");

class RackView {
  constructor(container) {
    this.container = container;
  }

  bindEvents(){
    createRack(this.container);
  };


}

module.exports = RackView;

function createRack(container) {
  const rack = new Rack();
  const bag = new Bag();
  rack.addTiles(bag.removeRandomTiles(7));
  const tiles = rack.tiles;
  tiles.forEach((tile, index) => {
    const tileSlot = document.createElement(`div`);
    tileSlot.id = index;
    tileSlot.value = tile.value;
    tileSlot.textContent = tile.letter;
    container.appendChild(tileSlot);
  })
  return container;

}
