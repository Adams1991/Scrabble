const Rack = require("../models/rack.js");
// below bag just for testing.
const Bag = require("../models/bag.js");
const PubSub = require('../helpers/pub_sub.js');

class RackView {
  constructor(container) {
    this.container = container;
  }

  bindEvents(rack){
    createRack(this.container, rack);
    this.container.addEventListener('click', (evt) => {
      const tileIndex = evt.target.id;
      this.container.childNodes.forEach((node, index) => {
        if(index == tileIndex){
          node.classList.add(`active`);
        }else {
          node.classList.remove(`active`);
        };
      });
      PubSub.publish(`Turn:index-last-clicked-tile`, tileIndex);
    })

    PubSub.subscribe('RackView:tile-on-board', () => {
      this.container.childNodes.forEach(node => {
        // console.dir(node.classList.contains(`active`));
        if(node.classList.contains(`active`)){
          node.classList.remove(`active`);
          node.classList.add(`on-board`);
        };
      });
    });
  };

};

module.exports = RackView;

function createRack(container, rack) {
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

function updateRack(container) {

}
