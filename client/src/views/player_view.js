const RackView = require('./rack_view.js');
const PubSub = require('../helpers/pub_sub.js');

class PlayerView {
  constructor(container) {
    this.container = container;
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
      endGameButton.textContent = "End Game"
      this.container.appendChild(endGameButton)
    });



  };


}

module.exports = PlayerView;
