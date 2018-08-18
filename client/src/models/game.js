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
    const sortedScores = scores.sort((a,b) => a - b);
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
    console.log(scores);
    const sortedScores = scores.sort((a,b) => a - b);
    console.log(sortedScores);
    const highestScore = sortedScores.pop();
    const secondHighestScore = sortedScores.pop();
    const lead = highestScore - secondHighestScore;
    return lead;
  };

};

module.exports = Game;
