const Rack = require("../models/rack.js");

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
  document.createElement(`td`);
}
