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





};

module.exports = Game;
