const FormView = require('./views/form_view.js');
const NewGameView = require('./views/new_game_view.js');
const Submission = require('./models/submission.js');
const ApiCheck = require('./models/api_check.js');

document.addEventListener('DOMContentLoaded', () => {

  const newGameButton = document.querySelector(`button#new-game`)
  const main = document.querySelector('.main');
  const formView = new FormView(newGameButton, main);
  formView.bindEvents();

  const url = `http://localhost:3000/api/games`
  const submission = new Submission(url);
  submission.bindEvents();

  const newGameView = new NewGameView(main);
  newGameView.bindEvents();

  const apiCheck = new ApiCheck();
  apiCheck.bindEvents();

});
