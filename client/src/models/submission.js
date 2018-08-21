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
      const activeTiles = document.querySelectorAll('div.active-tile');
      console.dir(activeTiles);
      activeTiles.forEach(activeTile => {
        const coordArray = activeTile.parentNode.id.split(`:`);
        const tile = new Tile(activeTile.textContent, activeTile.value);
        const coord = {
          x: parseInt(coordArray[0], 10),
          y: parseInt(coordArray[1], 10)
        };
        gameSubmission.game.board.addTileByCoord(tile, coord);
      });
      console.dir(gameSubmission.game.board);

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
