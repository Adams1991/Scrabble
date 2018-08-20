const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

class Submission {
  constructor(url) {
    this.request = new Request(url);
  }

  bindEvents() {
    PubSub.subscribe(`Submission:new-game`, (evt) => {
      const game = evt.detail;
      saveNewGame(game, this.request);
    })
  }


}

module.exports = Submission;

function saveNewGame(game, request) {
  request.post(game)
  .then(() => {
    PubSub.publish(`NewGameView:create-game-view`, game);
  })
  .catch((err) => {
    console.error(err);
  });
}
