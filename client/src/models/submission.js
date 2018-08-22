const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');
const Tile = require(`./tile.js`);
const Game = require(`./game.js`);


class Submission {
  constructor(url) {
    this.request = new Request(url);
    this.gameSubmission = null;
  };

  bindEvents() {
    PubSub.subscribe(`Submission:new-game`, (evt) => {
      const game = evt.detail;
      saveNewGame(game, this.request);
    });

    PubSub.subscribe('Submission:validation-results', (evt) => {
      const result = evt.detail;
      console.log(result);
        // if statement for skipping turn if incorrect word put down.
      if(result){
        //Add tiles to board model
        const activeTiles = document.querySelectorAll('div.active-tile');
        activeTiles.forEach(activeTile => {
          const coordArray = activeTile.parentNode.id.split(`:`);
          const tile = new Tile(activeTile.textContent, activeTile.value);
          const coord = {
            x: parseInt(coordArray[0], 10),
            y: parseInt(coordArray[1], 10)
          };
          this.gameSubmission.game.board.addTileByCoord(tile, coord);
        });

        //update rack
        const htmlRack = document.querySelector(`div#rack-container`);
        let tilesNeeded = 0;
        let indexesToRemove = [];
        htmlRack.childNodes.forEach((node, index) => {
          if(node.classList.contains(`on-board`)){
            indexesToRemove.push(index)
            tilesNeeded += 1;
            console.log(tilesNeeded);
          }
        });
        indexesToRemove.reverse()
        indexesToRemove.forEach(index => {
          this.gameSubmission.game.players[0].rack.removeTileByIndex(index);
        });
        const tilesFromBag =  this.gameSubmission.game.bag.removeRandomTiles(tilesNeeded);
        this.gameSubmission.game.players[0].addTilesToRack(tilesFromBag);
        //update score
        const score = this.gameSubmission.activeWords.reduce((score, word) => {
          return score + word.getWordScore();
        }, 0);
        this.gameSubmission.game.players[0].score += score;

        //index player
        const lastTurnPlayer = this.gameSubmission.game.players.shift()
        this.gameSubmission.game.players.push(lastTurnPlayer);

        saveCurrentGame(this.gameSubmission.game, this.request)
      } else {
        console.log(this.gameSubmission.game);
        getCurrentGame(this.gameSubmission.game)
      }
    })

    PubSub.subscribe(`Submission:game-submitted`, (evt) => {
      this.gameSubmission = evt.detail;
      const activeWordsForCheck = this.gameSubmission.activeWords;
      console.log(activeWordsForCheck);


      PubSub.publish('ApiCheck:word-to-be-checked', activeWordsForCheck)



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

function getCurrentGame(game) {
  // request.get(gameID)
  // .then((savedGame) => {
    PubSub.publish(`TransitionView:current-game`, game);
  // })
  // .catch((err) => {
  //   console.error(err);
  // });
}
