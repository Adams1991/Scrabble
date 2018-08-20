const PubSub = require('../helpers/pub_sub.js');

class Turn {
  constructor() {
    this.tile = null;
    this.coord = null;
    this.primaryActiveWord = null
    this.secondaryActiveWords = [];
  }

  bindingEvent() {
    PubSub.subscribe(`Turn:start-player-turn`, () => {
      this.tile = null;
      this.coord = null;
      //TODO: render player view (setup evt for rack)
    })

  }

}
