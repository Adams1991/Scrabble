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
