const BoardView = require('./views/board_view.js');


document.addEventListener('DOMContentLoaded', () => {

  const boardTable = document.querySelector('#board');
  const boardView = new BoardView(boardTable);
  boardView.bindEvents();


});
