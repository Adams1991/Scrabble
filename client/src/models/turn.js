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
        this.primaryActiveWord = createActiveWord(this.tile, this.coord, this.secondTile, this.secondCoord, this.game.board)
        if (this.primaryActiveWord !== null){
          console.dir(this.primaryActiveWord);
          const tileOnBoard = {tile: this.secondTile, coord: this.secondCoord};
          PubSub.publish('BoardView:tile-on-board', tileOnBoard);
          PubSub.publish('RackView:tile-on-board', null)
          const adjacentTiles = this.game.board.getAdjacentTiles(this.secondCoord);
          adjacentTiles.forEach((adjacentTile) => {
            const secondaryActiveWord = createActiveWord(this.secondTile, this.secondCoord, adjacentTile.tile, adjacentTile.coord, this.game.board);
            this.secondaryActiveWords.push(secondaryActiveWord);
            console.log(`second`, this.secondaryActiveWords);
          });
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
            const secondaryActiveWord = createActiveWord(this.tile, this.coord, adjacentTile.tile, adjacentTile.coord, this.game.board);
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
      }else {
        this[interactedElement.toLowerCase()] = activeDescriptor;
        if (this.tile !== null && this.coord !== null){
          const tileOnBoard = {tile: this.tile, coord: this.coord}
          PubSub.publish('BoardView:tile-on-board', tileOnBoard);
          PubSub.publish('RackView:tile-on-board', null);
          const adjacentTiles = this.game.board.getAdjacentTiles(this.coord);
          adjacentTiles.forEach((adjacentTile) => {
            const secondaryActiveWord = createActiveWord(this.tile, this.coord, adjacentTile.tile, adjacentTile.coord, this.game.board);
            this.secondaryActiveWords.push(secondaryActiveWord);
            console.log(`first`, this.secondaryActiveWords);
          });
        };
      };
    };
  }

}

module.exports = Turn;

function createActiveWord(firstTile, firstCoord, secondTile, secondCoord, board) {
  const firstPlacedTile = {tile: firstTile, coord: firstCoord};
  if(secondTile !== null && secondCoord !== null){
    const secondPlacedTile = {tile: secondTile, coord: secondCoord};
    const activeWord = new ActiveWord(firstPlacedTile, secondPlacedTile);
    if(activeWord.direction && activeWord.tiles){
      const direction = otherDirection(Object.keys(activeWord.direction)[0]);
      let beginningCoord = activeWord.tiles[0].coord;
      let endCoord = activeWord.tiles[activeWord.tiles.length-1].coord;

      let adjacentTile = board.getTileBefore(direction, beginningCoord);
      console.dir(adjacentTile);
      console.dir(beginningCoord);
      while (adjacentTile !== null) {
        activeWord.addTile(adjacentTile);
        beginningCoord = adjacentTile.coord;
        adjacentTile = board.getTileBefore(direction, beginningCoord);
      }

      adjacentTile = board.getTileAfter(direction, endCoord);
      console.dir(board.getTileAfter('y', endCoord));
      console.dir(direction);
      console.dir(endCoord);
      while (adjacentTile !== null) {
        activeWord.addTile(adjacentTile);
        endCoord = adjacentTile.coord;
        adjacentTile = board.getTileBefore(direction, endCoord);
      }

      return activeWord;
    }
  }
  return null;
}

function otherDirection(directionKey) {
  if(directionKey === "x"){
    return "y";
  }else{
    return "x";
  }
}
