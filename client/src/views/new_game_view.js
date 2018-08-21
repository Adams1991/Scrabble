const PubSub = require('../helpers/pub_sub.js');
const Turn = require('../models/turn.js');
const BoardView = require('./board_view.js');
const TransitionView = require('./transition_view.js');
const PlayerView = require('./player_view.js');
const ScoreView = require('./score_view.js');

class NewGameView {
  constructor(container) {
    this.container = container;
  };

  bindEvents() {

    PubSub.subscribe(`NewGameView:create-game-view`, (evt) => {
      this.container.innerHTML = '';
      const game = evt.detail;

      //makes board wrapper
      const boardWrapper = document.createElement("div");
      boardWrapper.id = "board-wrapper"
      const boardTable = document.createElement("table");
      boardTable.id = "board";
      boardWrapper.appendChild(boardTable);
      this.container.appendChild(boardWrapper);

      //makes player score wrapper
      const playerScoreWrapper = document.createElement("div");
      playerScoreWrapper.id = "player-score-wrapper";
      const playerWrapper = document.createElement("div");
      playerWrapper.id = "player-wrapper"
      playerScoreWrapper.appendChild(playerWrapper);
      const scoreWrapper = document.createElement("div");
      scoreWrapper.id = "score-wrapper"
      playerScoreWrapper.appendChild(scoreWrapper);
      this.container.appendChild(playerScoreWrapper);

      // makes board view
      const boardView = new BoardView(boardTable);
      boardView.bindEvents();

      // makes player views
      const playerView = new PlayerView(playerWrapper);
      playerView.bindEvents();

      // makes score views
      const scoreView = new ScoreView(scoreWrapper);
      scoreView.bindEvents();

      const turn = new Turn();
      turn.bindEvents();

      // makes transition view
      const transitionView = new TransitionView(playerWrapper)
      transitionView.bindEvents();
      PubSub.publish('TransitionView:current-game', game);
    });
  };
};

module.exports = NewGameView;
