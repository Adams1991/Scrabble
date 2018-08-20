const PubSub = require('../helpers/pub_sub.js');

class TransitionView {

  constructor(container){
    this.game = null;
    this.container = container;
  };

  bindEvents(){
    PubSub.subscribe(`TransitionView:current-game`, (evt) => {
      this.game = evt.detail;
      PubSub.publish('BoardView:update-board', this.game.board.squares);
      PubSub.publish('ScoreView:update-scores', this.game);
      this.container.innerHTML = '';
      const button = document.createElement('button');
      button.id = 'start-turn';
      button.textContent = 'Start turn';
      this.container.appendChild(button);
      button.addEventListener('click', () => {
        PubSub.publish('Turn:player-turn', this.game);
      });
    });
  };

};

module.exports = TransitionView;
