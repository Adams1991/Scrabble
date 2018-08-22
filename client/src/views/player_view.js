const RackView = require('./rack_view.js');
const PubSub = require('../helpers/pub_sub.js');

class PlayerView {
  constructor(container) {
    this.container = container;
    this.gameSubmission = null;
  }

  bindEvents(){

    PubSub.subscribe(`PlayerView:display-view`, (evt) => {

      const player = evt.detail;
      this.container.innerHTML = ``;

      // setups rack
      const rackContainer = document.createElement('div');
      rackContainer.id = "rack-container"
      this.container.appendChild(rackContainer)
      const rackView = new RackView(rackContainer);
      rackView.bindEvents(player.rack);

      const br1 = document.createElement('br');
      const br2 = document.createElement('br');
      this.container.appendChild(br1);
      this.container.appendChild(br2);

      const endTurnButton = document.createElement('button');
      endTurnButton.id = "end-turn-button"
      endTurnButton.textContent = "End Turn"
      endTurnButton.classList.add(`hide`);
      this.container.appendChild(endTurnButton);
      endTurnButton.addEventListener(`click`, () => {
        PubSub.publish(`Submission:game-submitted`, this.gameSubmission);
      });

      const br3 = document.createElement('br');
      this.container.appendChild(br3);

      // setups swapButton
      const swapButton = document.createElement('button');
      swapButton.id = "swap-button"
      swapButton.textContent = "Swap"
      this.container.appendChild(swapButton)

      // setups passButton
      const passButton = document.createElement('button');
      passButton.id = "pass-button"
      passButton.textContent = "Pass"
      this.container.appendChild(passButton)

      // setups
      const endGameButton = document.createElement('button');
      endGameButton.id = "end-game-button"
      endGameButton.textContent = "Forfeit"
      this.container.appendChild(endGameButton)

      PubSub.subscribe(`PlayerView:game-ready`, (evt) => {
        this.gameSubmission = evt.detail;
        endTurnButton.classList.remove(`hide`);
      });

    });


  };


}

module.exports = PlayerView;
