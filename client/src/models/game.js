const Board = require('./board.js');
const Player = require('./player.js');
const Bag = require('./bag.js');
// const Rack = require('./rack.js');

class Game {
  constructor(players) {
    this.players = players;
    this.board = new Board();
    this.bag = new Bag();
  };

  getNumberOfTilesInBag() {
    return this.bag.getNumberOfTiles();
  };

  determineLeaders() {
    let leaders = [];
    const scores = this.players.map(player => player.score);
    const maxScore = Math.max.apply(Math, scores);
    this.players.forEach((player) => {
      if (player.score === maxScore) {
        leaders.push(player);
      };
    });
    return leaders;
  };

  

};

module.exports = Game;
