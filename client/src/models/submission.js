const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');
const Tile = require(`./tile.js`);
const Game = require(`./game.js`);


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
      const activeWords = gameSubmission.activeWords;
      const activeWordResults = [];

      activeWords.forEach((word) => {
        PubSub.publish('ApiCheck:word-to-be-checked', word.getWord())
      });

      PubSub.subscribe('Submission:validation-results', (evt) => {
        const result = evt.detail;
        console.log(result);
        activeWordResults.push(result);
      })



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
      const score = gameSubmission.activeWords.reduce((score, word) => {
        return score + word.getWordScore();
      }, 0);
      gameSubmission.game.players[0].score += score;

      //index player
      const lastTurnPlayer = gameSubmission.game.players.shift()
      gameSubmission.game.players.push(lastTurnPlayer);

      saveCurrentGame(gameSubmission.game, this.request)
    });

  };
};

module.exports = Submission;

function saveNewGame(game, request) {
  request.post(game)
  .then((savedGame) => {
    game._id = savedGame._id;
    PubSub.publish(`NewGameView:create-game-view`, game);
  })
  .catch((err) => {
    console.error(err);
  });
};



function saveCurrentGame(game, request) {
  request.update(game._id, game)
  .then((savedGame) => {
    PubSub.publish(`TransitionView:current-game`, game);
  })
  .catch((err) => {
    console.error(err);
  });
}
