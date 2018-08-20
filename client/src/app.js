const FormView = require('./views/form_view.js');
const NewGameView = require('./views/new_game_view.js');
const Submission = require('./models/submission.js');

document.addEventListener('DOMContentLoaded', () => {

  const newGameButton = document.querySelector(`button#new-game`)
  const body = document.querySelector('body');
  const formView = new FormView(newGameButton, body);
  formView.bindEvents();

  const url = `http://localhost:3000/api/games`
  const submission = new Submission(url);
  submission.bindEvents();

  const newGameView = new NewGameView(body);
  newGameView.bindEvents();

});
