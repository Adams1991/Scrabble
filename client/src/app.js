const BoardView = require('./views/board_view.js');
const RackView = require('./views/rack_view.js');


document.addEventListener('DOMContentLoaded', () => {

  const rackContainer = document.querySelector('#rack');
  const rackView = new RackView(rackContainer);
  rackView.bindEvents();

  const boardTable = document.querySelector('#board');
  const boardView = new BoardView(boardTable);
  boardView.bindEvents();


});
