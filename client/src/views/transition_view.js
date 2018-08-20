const PubSub = require('../helpers/pub_sub.js');

class TransitionView {

  constructor(container){
    this.game = null;
    this.container = container;
  };

  bindEvents(){
    PubSub.subscribe(`TransitionView:current-game`, (evt) => {
      this.game = evt.detail;
      
    });
  }

}

module.exports = TransitionView;
