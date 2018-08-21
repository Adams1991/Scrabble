const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');
const Tile = require(`./tile.js`);

class Submission {
  constructor(url) {
    this.request = new Request(url);
  };

  bindEvents() {
    PubSub.subscribe(`Submission:new-game`, (evt) => {
      const game = evt.detail;
      saveNewGame(game, this.request);
    });

    PubSub.subscribe(`Submission:game-submitted`, (evt) => {
      const gameSubmission = evt.detail;

      //Add tiles to board model
      const activeTiles = document.querySelectorAll('div.active-tile');
      activeTiles.forEach(activeTile => {
        const coordArray = activeTile.parentNode.id.split(`:`);
        const tile = new Tile(activeTile.textContent, activeTile.value);
        const coord = {
          x: parseInt(coordArray[0], 10),
          y: parseInt(coordArray[1], 10)
        };
        gameSubmission.game.board.addTileByCoord(tile, coord);
      });

      //update rack
      const htmlRack = document.querySelector(`div#rack-container`);
      let tilesNeeded = 0;
      htmlRack.childNodes.forEach((node, index) => {
        if(node.classList.contains(`on-board`)){
          gameSubmission.game.players[0].rack.removeTileByIndex(index);
          tilesNeeded += 1;
        }
      });
      gameSubmission.game.players[0].getTilesFromBag(tilesNeeded, gameSubmission.game.bag);

      //update score
      console.dir(gameSubmission.activeWords);
      const score = gameSubmission.activeWords.reduce((score, word) => {
        return score + word.getWordScore();
      }, 0);
      gameSubmission.game.players[0].score += score;
      console.log(gameSubmission.game.players[0].score);
    });

  };
};

module.exports = Submission;

function saveNewGame(game, request) {
  request.post(game)
  .then(() => {
    PubSub.publish(`NewGameView:create-game-view`, game);
  })
  .catch((err) => {
    console.error(err);
  });
};
