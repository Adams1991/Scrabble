const PubSub = require('../helpers/pub_sub.js');

class Turn {
  constructor() {
    this.game = null;
    this.tile = null;
    this.coord = null;
    this.primaryActiveWord = null
    this.secondaryActiveWords = [];
  }

  bindEvents() {
    PubSub.subscribe(`Turn:start-player-turn`, (evt) => {
      this.tile = null;
      this.coord = null;
      this.game = evt.detail;
      console.dir(this.game);
      //TODO: render player view (setup evt for rack)
    })

  }

}

module.exports = Turn;
