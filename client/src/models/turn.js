const PubSub = require('../helpers/pub_sub.js');
const ActiveWord = require(`./active_word.js`);

class Turn {
  constructor() {
    this.game = null;
    this.player = null;
    this.tile = null;
    this.secondTile = null;
    this.coord = null;
    this.secondCoord = null;
    this.primaryActiveWord = null
    this.secondaryActiveWords = [];
  }

  bindEvents() {
    PubSub.subscribe(`Turn:start-player-turn`, (evt) => {
      this.tile = null;
      this.coord = null;
      this.game = evt.detail;
      this.player = this.game.players[0]
      PubSub.publish(`PlayerView:display-view`, this.player);

      PubSub.subscribe(`Turn:index-last-clicked-tile`, (evt) => {
        const rackIndex = evt.detail;
        const activeTile = this.player.getTileInRackByIndex(rackIndex);
        if (this.primaryActiveWord === null){
          if (this.tile !== null && this.coord !== null) {
            this.secondTile = activeTile;
            this.primaryActiveWord = createActiveWord(this.tile, this.coord, this.secondTile, this.secondCoord)
          }else {
            this.tile = activeTile;
          }
        }else {
          this.tile = activeTile;
          addToPrimaryActiveWord(this.primaryActiveWord, this.tile, this.coord);
        }
      });

      PubSub.subscribe(`Turn:coord-of-last-square-clicked`, (evt) => {
        const activeCoord = evt.detail;
        if(this.game.board.getTileByCoord(activeCoord) !== null){
          return;
        }
        if (this.primaryActiveWord === null){
          if (this.tile !== null && this.coord !== null) {
            this.secondCoord = activeCoord;
            this.primaryActiveWord = createActiveWord(this.tile, this.coord, this.secondTile, this.secondCoord)
          }else {
            this.coord = activeCoord;
          }
        }else {
          this.coord = activeCoord;
          addToPrimaryActiveWord(this.primaryActiveWord, this.tile, this.coord);
        }
      });
    });

  }

}

module.exports = Turn;

function addToPrimaryActiveWord() {

}

function createActiveWord(firstTile, firstCoord, secondTile, secondCoord) {
  const firstPlacedTile = {tile: firstTile, coord: firstCoord};
  if(secondTile !== null && secondCoord !== null){
    const secondPlacedTile = {tile: secondTile, coord: secondCoord};
    const primaryActiveWord = new ActiveWord(firstPlacedTile, secondPlacedTile);
    if(primaryActiveWord.direction && primaryActiveWord.tiles){
      return primaryActiveWord;
    }
  }
  return null;
}
