class TransitionView {

  constructor(players){
    this.game = null;
    this.players = players;
  };

  bindEvents(){

    this.game = new Game(this.players);
  }

}

module.exports = TransitionView;
