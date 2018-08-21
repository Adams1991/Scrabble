const Board = require('./board.js');
const Player = require('./player.js');
const Bag = require('./bag.js');
// const Rack = require('./rack.js');

class Game {
  constructor(players) {
    this.players = players;
    this.board = new Board();
    this.bag = new Bag();
    this._id = null;
    giveStartingTiles(players, this.bag);
  };

  getNumberOfTilesInBag() {
    return this.bag.getNumberOfTiles();
  };

  getScores() {
    return this.players.map(player => player.score);
  };

  determineLeaders() {
    let leaders = [];
    const scores = this.players.map(player => player.score);
    const sortedScores = scores.sort((n1, n2) => n1 - n2);
    const highestScore = sortedScores.pop();
    this.players.forEach((player) => {
      if (player.score === highestScore) {
        leaders.push(player);
      };
    });
    return leaders;
  };

  determineLead() {
    const scores = this.players.map(player => player.score);
    const sortedScores = scores.sort((n1, n2) => n1 - n2);
    const highestScore = sortedScores.pop();
    const secondHighestScore = sortedScores.pop();
    const lead = highestScore - secondHighestScore;
    return lead;
  };

};

module.exports = Game;

function giveStartingTiles(players, bag) {
  players.forEach(player => {
    const tiles = bag.removeRandomTiles(7);
    player.addTilesToRack(tiles);
  });
};
