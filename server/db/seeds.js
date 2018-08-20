
use scrabble;
db.dropDatabase();

const Player = require('../../client/src/models/player.js');
const Game = require('../../client/src/models/game.js');

const player1 = new Player('Connor');
const player2 = new Player('Amaya');
const player3 = new Player('Greg');
const players = [player1, player2, player3];
const game = new Game(players);
db.games.insertOne(game);
