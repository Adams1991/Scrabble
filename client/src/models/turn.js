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
        if (this.primaryActiveWord === null){
          this.phaseOneA(`Tile`, activeTile);
          this.phaseOneB(`Tile`, activeTile);
        } else {
          this.phaseTwo(`Tile`, activeTile);
        }
      });


      PubSub.subscribe(`Turn:coord-of-last-square-clicked`, (evt) => {
        const activeCoord = evt.detail;
        if(this.game.board.getTileByCoord(activeCoord) !== null){
          return;
        };
        if (this.primaryActiveWord === null){
          this.phaseOneA(`Coord`, activeCoord)
          this.phaseOneB(`Coord`, activeCoord)
        }else {
          this.phaseTwo(`Coord`, activeCoord);
        }
      });
    });

  };

  phaseOneA(interactedElement, activeDescriptor) {
    if (this.tile !== null && this.coord !== null) {
      this[`second${interactedElement}`] = activeDescriptor;
    }else {
      this[interactedElement.toLowerCase()] = activeDescriptor;
      if (this.tile !== null && this.coord !== null){
        this.putTileOnBoard(this.tile, this.coord);
        const adjacentTiles = this.game.board.getAdjacentTiles(this.coord);
        adjacentTiles.forEach((adjacentTile) => {
          const secondaryActiveWord = this.createActiveWord(this.tile, this.coord, adjacentTile.tile, adjacentTile.coord);
          this.secondaryActiveWords.push(secondaryActiveWord);
        });
      };
    };
  };

  phaseOneB(interactedElement, activeDescriptor) {
    if (this.tile !== null && this.coord !== null) {
      this.primaryActiveWord = this.createActiveWord(this.tile, this.coord, this.secondTile, this.secondCoord);
      if (this.primaryActiveWord === null && this.secondTile !== null && this.secondCoord !== null){
        this.createPrimaryWordFromSecondary();
      };
      if (this.primaryActiveWord !== null){
        this.putTileOnBoard(this.secondTile, this.secondCoord);
        this.createSecondaryWords(this.secondTile, this.secondCoord);
        this.tile = null;
        this.secondTile = null;
        this.coord = null;
        this.gameReady();
      }
      this.secondCoord = null;
    };
  }

  phaseTwo(interactedElement, activeDescriptor){
    this[interactedElement.toLowerCase()] = activeDescriptor;
    if(this.tile !== null && this.coord !== null){
      const placedTile = {tile: this.tile, coord: this.coord};
      if (this.primaryActiveWord.addTile(placedTile)){
        this.putTileOnBoard(this.tile, this.coord);
        this.createSecondaryWords(this.tile, this.coord);
        this.tile = null;
      };
      this.coord = null;
    };
  };

  createPrimaryWordFromSecondary(){
    const firstPlacedTile = {tile: this.tile, coord: this.coord};
    const secondPlacedTile = {tile: this.secondTile, coord: this.secondCoord};
    const possibleWordDirection = calculateDirection(this.coord, this.secondCoord);
    let removeIndex;
    this.secondaryActiveWords.forEach((word, index) => {
      if(word.direction.x === possibleWordDirection.x && word.direction.y === possibleWordDirection.y && word.containsTile(firstPlacedTile)){
        if(word.addTile(secondPlacedTile)){
          this.primaryActiveWord = word;
          removeIndex = index;
        };
      };
    });
    if(removeIndex !== undefined){
      this.secondaryActiveWords.splice(removeIndex, 1);
    }
  };

  putTileOnBoard(tile, coord){
    const tileOnBoard = {tile: tile, coord: coord};
    PubSub.publish('BoardView:tile-on-board', tileOnBoard);
    PubSub.publish('RackView:tile-on-board', null)
  };

  createSecondaryWords(tile, coord){
    const adjacentTiles = this.game.board.getAdjacentTiles(coord);
    adjacentTiles.forEach((adjacentTile) => {
      if(!this.primaryActiveWord.containsTile(adjacentTile)){
        const secondaryActiveWord = this.createActiveWord(tile, coord, adjacentTile.tile, adjacentTile.coord);
        this.secondaryActiveWords.push(secondaryActiveWord);
      };
    });
  };

  createActiveWord(firstTile, firstCoord, secondTile, secondCoord) {
    const firstPlacedTile = {tile: firstTile, coord: firstCoord};
    if(secondTile !== null && secondCoord !== null){
      const secondPlacedTile = {tile: secondTile, coord: secondCoord};
      const activeWord = new ActiveWord(firstPlacedTile, secondPlacedTile);
      if(activeWord.direction && activeWord.tiles){
        const direction = otherDirection(Object.keys(activeWord.direction)[0]);
        let beginningCoord = activeWord.tiles[0].coord;
        let endCoord = activeWord.tiles[activeWord.tiles.length-1].coord;
        let adjacentTile = this.game.board.getTileBefore(direction, beginningCoord);
        while (adjacentTile !== null) {
          activeWord.addTile(adjacentTile);
          beginningCoord = adjacentTile.coord;
          adjacentTile = this.game.board.getTileBefore(direction, beginningCoord);
        }
        adjacentTile = this.game.board.getTileAfter(direction, endCoord);
        while (adjacentTile !== null) {
          activeWord.addTile(adjacentTile);
          endCoord = adjacentTile.coord;
          adjacentTile = this.game.board.getTileBefore(direction, endCoord);
        }
        return activeWord;
      }
    }
    return null;
  }

  gameReady() {
    const activeWords = this.secondaryActiveWords.map(activeWord => activeWord);
    activeWords.push(this.primaryActiveWord);
    const gameSubmission = {
      game: this.game,
      activeWords: activeWords
    };
    PubSub.publish(`PlayerView:game-ready`, gameSubmission);
  };

}

module.exports = Turn;

function otherDirection(directionKey) {
  if(directionKey === "x"){
    return "y";
  }else{
    return "x";
  }
}

function calculateDirection(firstCoord, secondCoord){
  let direction = null;
  if(firstCoord.x === secondCoord.x){
    direction = { x: firstCoord.x}
  } else if(firstCoord.y === secondCoord.y){
    direction = { y: firstCoord.y}
  }
  return direction;
};
