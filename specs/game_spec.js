const assert = require('assert');
const Game = require('../client/src/models/game.js');
const Player = require('../client/src/models/player.js');
const Bag = require('../client/src/models/bag.js');

describe('Game', () => {

  let player1;
  let player2;
  let player3;
  let game;

  beforeEach(() => {
    player1 = new Player('Connor');
    player2 = new Player('Amaya');
    player3 = new Player('Greg');
    players = [player1, player2, player3];
    game = new Game(players);
  });

  it('should have the number of players passed in', () => {
    assert.deepStrictEqual(game.players.length, 3);
  });

  it('should be able to get the names of its players', () => {
    assert.deepStrictEqual(game.players[1].name, 'Amaya');
  });

  it('should be able to get the score of a player', () => {
    assert.deepStrictEqual(game.players[2].score, 0);
    player1.addToScore(345);
    player1.subtractFromScore(3);
    assert.deepStrictEqual(game.players[0].score, 342);
  });

  it('should have a full bag of tiles on start', () => {
    assert.deepStrictEqual(game.bag.tiles.length, 100);
  });

  it('should have a board with 15 rows', () => {
    assert.deepStrictEqual(game.board.squares.length, 15);
  });

  it('should have a board with 15 columns', () => {
    assert.deepStrictEqual(game.board.squares[3].length, 15);
    assert.deepStrictEqual(game.board.squares[7].length, 15);
    assert.deepStrictEqual(game.board.squares[14].length, 15);
    assert.deepStrictEqual(game.board.squares[19], undefined);
  });

});
