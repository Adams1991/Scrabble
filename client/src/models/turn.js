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
      this.secondTile = null;
      this.coord = null;
      this.secondCoord = null;
      this.primaryActiveWord = null
      this.secondaryActiveWords = [];
      this.game = evt.detail;
      this.player = this.game.players[0]
      PubSub.publish(`PlayerView:display-view`, this.player);


      PubSub.subscribe(`Turn:index-last-clicked-tile`, (evt) => {
        const rackIndex = evt.detail;
        const activeTile = this.player.getTileInRackByIndex(rackIndex);
        this.manipulateSecondaryActiveWords(`Tile`, activeTile)
        this.manipulatePrimaryWord(`Tile`, activeTile)
        if (this.primaryActiveWord !== null){
          const activeWords = this.secondaryActiveWords.map(activeWord => activeWord);
          activeWords.push(this.primaryActiveWord);
          const gameSubmission = {
            game: this.game,
            activeWords: activeWords
          };
          PubSub.publish(`PlayerView:game-ready`, gameSubmission);
        };
      });


      PubSub.subscribe(`Turn:coord-of-last-square-clicked`, (evt) => {
        const activeCoord = evt.detail;
        if(this.game.board.getTileByCoord(activeCoord) !== null){
          return;
        };
        this.manipulateSecondaryActiveWords(`Coord`, activeCoord)
        this.manipulatePrimaryWord(`Coord`, activeCoord);
        if (this.primaryActiveWord !== null){
          const activeWords = this.secondaryActiveWords.map(activeWord => activeWord);
          activeWords.push(this.primaryActiveWord);
          const gameSubmission = {
            game: this.game,
            activeWords: activeWords
          };
          PubSub.publish(`PlayerView:game-ready`, gameSubmission);
        }
      });
    });

  };

  manipulatePrimaryWord(interactedElement, activeDescriptor){
    if (this.primaryActiveWord === null){
      if (this.tile !== null && this.coord !== null) {
        this.primaryActiveWord = createActiveWord(this.tile, this.coord, this.secondTile, this.secondCoord)
        if (this.primaryActiveWord !== null){
          const tileOnBoard = {tile: this.secondTile, coord: this.secondCoord};
          PubSub.publish('BoardView:tile-on-board', tileOnBoard);
          PubSub.publish('RackView:tile-on-board', null)
          this.tile = null;
          this.secondTile = null;
          this.coord = null;
        }
        this.secondCoord = null;
      };
    }else {
      this[interactedElement.toLowerCase()] = activeDescriptor;
      if(this.tile !== null && this.coord !== null){
        const placedTile = {tile: this.tile, coord: this.coord};
        if (this.primaryActiveWord.addTile(placedTile)){
          const tileOnBoard = {tile: this.tile, coord: this.coord}
          PubSub.publish('BoardView:tile-on-board', tileOnBoard);
          PubSub.publish('RackView:tile-on-board', null);
          const adjacentTiles = this.game.board.getAdjacentTiles(this.coord);
          adjacentTiles.forEach((adjacentTile) => {
            const secondaryActiveWord = createActiveWord(this.tile, this.coord, adjacentTile.tile, adjacentTile.coord);
            this.secondaryActiveWords.push(secondaryActiveWord);
            console.log(`other`, this.secondaryActiveWords);
          });
          this.tile = null;
        };
        this.coord = null;
      }
    };
  }

  manipulateSecondaryActiveWords(interactedElement, activeDescriptor) {
    if (this.primaryActiveWord === null){
      if (this.tile !== null && this.coord !== null) {
        this[`second${interactedElement}`] = activeDescriptor;
        if (this.secondTile !== null && this.secondCoord !== null){
          const adjacentTiles = this.game.board.getAdjacentTiles(this.secondCoord);
          adjacentTiles.forEach((adjacentTile) => {
            const secondaryActiveWord = createActiveWord(this.secondTile, this.secondCoord, adjacentTile.tile, adjacentTile.coord);
            this.secondaryActiveWords.push(secondaryActiveWord);
            console.log(`second`, this.secondaryActiveWords);
          });
        }
      }else {
        this[interactedElement.toLowerCase()] = activeDescriptor;
        if (this.tile !== null && this.coord !== null){
          const tileOnBoard = {tile: this.tile, coord: this.coord}
          PubSub.publish('BoardView:tile-on-board', tileOnBoard);
          PubSub.publish('RackView:tile-on-board', null);
          const adjacentTiles = this.game.board.getAdjacentTiles(this.coord);
          adjacentTiles.forEach((adjacentTile) => {
            const secondaryActiveWord = createActiveWord(this.tile, this.coord, adjacentTile.tile, adjacentTile.coord);
            this.secondaryActiveWords.push(secondaryActiveWord);
            console.log(`first`, this.secondaryActiveWords);
          });
        };
      };
    };
  }

}

module.exports = Turn;

function createActiveWord(firstTile, firstCoord, secondTile, secondCoord) {
  const firstPlacedTile = {tile: firstTile, coord: firstCoord};
  if(secondTile !== null && secondCoord !== null){
    const secondPlacedTile = {tile: secondTile, coord: secondCoord};
    const activeWord = new ActiveWord(firstPlacedTile, secondPlacedTile);
    if(activeWord.direction && activeWord.tiles){
      return activeWord;
    }
  }
  return null;
}
