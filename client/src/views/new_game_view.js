const PubSub = require('../helpers/pub_sub.js');
const Player = require('../models/player.js');
const Game = require('../models/game.js');
const BoardView = require('./board_view.js');
const TransitionView = require('./transition_view.js');
const PlayerView = require('./player_view.js');
const ScoreView = require('./score_view.js');


class NewGameView {
  constructor(button, container) {
    this.container = container;
    this.button = button;
  }

  bindEvents() {
    this.button.addEventListener(`click`, () => {
      this.container.innerHTML = '';
      const form = document.createElement(`form`);

      const listTitle = document.createElement(`h3`);
      listTitle.textContent = `Players:`
      form.appendChild(listTitle);

      const playerList = document.createElement(`ol`);
      playerList.id = `player-list`;
      for (var i = 0; i < 2; i++) {
        const player = document.createElement('li');
        const playerInput = document.createElement(`input`);
        playerInput.type = `text`;
        playerInput.required = `true`;
        playerInput.value = `Shaun`;
        playerInput.classList.add(`player-input`);
        playerInput.name = `playerInput`;
        player.appendChild(playerInput);
        playerList.appendChild(player);
      };
      form.appendChild(playerList);

      const submitButton = document.createElement(`input`);
      submitButton.type = `submit`;
      submitButton.value = `Start Game`;
      form.appendChild(submitButton);
      this.container.appendChild(form);

      form.addEventListener(`submit`, (evt) => {
        evt.preventDefault();
        const playerDetails = evt.target.playerInput;
        const players = [];
        playerDetails.forEach(playerName => {
          const player = new Player(playerName.value);
          players.push(player);
        });
        const game = new Game(players);
        PubSub.publish(`Submission:new-game`, game);
      });

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
        // const playerView = new PlayerView(playerWrapper);
        // playerView.bindEvents();

        // makes score views
        const scoreView = new ScoreView(scoreWrapper);
        scoreView.bindEvents();

        // makes transition view
        const transitionView = new TransitionView(playerWrapper)
        transitionView.bindEvents();
        PubSub.publish('TransitionView:current-game', game);
      });
    });

  }

}

module.exports = NewGameView;
