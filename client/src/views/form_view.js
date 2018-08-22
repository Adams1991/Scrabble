const PubSub = require('../helpers/pub_sub.js');
const Player = require('../models/player.js');
const Game = require('../models/game.js');

class FormView {
  constructor(button, container) {
    this.container = container;
    this.button = button;
  };

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
        playerInput.classList.add(`player-input`);
        playerInput.name = `playerInput`;
        player.appendChild(playerInput);
        playerList.appendChild(player);
      };
      form.appendChild(playerList);

      const submitButton = document.createElement(`input`);
      submitButton.type = `submit`;
      submitButton.value = `Start Game`;
      submitButton.classList.add(`start-game`);
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
    });
  };
};

module.exports = FormView;
