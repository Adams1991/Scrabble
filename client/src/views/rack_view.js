const Rack = require("../models/rack.js");
// below bag just for testing.
const Bag = require("../models/bag.js");
const PubSub = require('../helpers/pub_sub.js');

class RackView {
  constructor(container) {
    this.container = container;
  }

  bindEvents(){
    createRack(this.container);
    this.container.addEventListener('click', (evt) => {
      const tileIndex = evt.target.id;
      PubSub.publish(`RackView:index-last-clicked-tile`, tileIndex);
      console.log(tileIndex);
    })

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
    tileSlot.textContent = tile.letter;
    tileSlot.classList.add('tileSlot');
    container.appendChild(tileSlot);
  })
  return container;

}
