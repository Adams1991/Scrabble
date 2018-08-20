const BoardView = require('./views/board_view.js');
const RackView = require('./views/rack_view.js');
const TransitionView = require('./views/transition_view.js');
const PlayerView = require('./views/player_view.js');
const ScoreView = require('./views/score_view.js');
const NewGameView = require('./views/new_game_view.js');
const Submission = require('./models/submission.js');


// const Player = require('../../client/src/models/player.js');
// const Game = require('../../client/src/models/game.js');
//
// const player1 = new Player('Connor');
// const player2 = new Player('Amaya');
// const player3 = new Player('Greg');
// const players = [player1, player2, player3];
// const game = new Game(players);

document.addEventListener('DOMContentLoaded', () => {

  const newGameButton = document.querySelector(`button#new-game`)
  const body = document.querySelector('body');
  const newGameView = new NewGameView(newGameButton, body);
  newGameView.bindEvents();

  const url = `http://localhost:3000/api/games`
  const submission = new Submission(url);
  submission.bindEvents();

  // const playerContainer = document.querySelector(`#player-wrapper`)
  // const playerView = new PlayerView(playerContainer)
  // playerView.bindEvents();
  // const transitionView = new TransitionView(playerContainer)
  // transitionView.bindEvents();
  //
  // const scoreContainer = document.querySelector(`#score-wrapper`)
  // const scoreView = new ScoreView(scoreContainer);
  // scoreView.bindEvents();
  //
  // const boardTable = document.querySelector('#board');
  // const boardView = new BoardView(boardTable);
  // boardView.bindEvents();

});

// const rackContainer = document.querySelector('#rack');
// const rackView = new RackView(rackContainer);
// rackView.bindEvents();
