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


      PubSub.subscribe(`Turn:new-rack-button-click`, () => {
        // all html rack tiles on Board
        //send through this.game
      })

      PubSub.subscribe(`Turn:index-last-clicked-tile`, (evt) => {
        const rackIndex = evt.detail;
        const activeTile = this.player.getTileInRackByIndex(rackIndex);
        if (this.primaryActiveWord === null){
          this.placeFirstTile(`Tile`, activeTile);
          this.placeSecondTile(`Tile`, activeTile);
        } else {
          this.placeOtherTiles(`Tile`, activeTile);
        }
      });


      PubSub.subscribe(`Turn:coord-of-last-square-clicked`, (evt) => {
        const activeCoord = evt.detail;
        if(this.game.board.getTileByCoord(activeCoord) !== null){
          return;
        };
        if (this.primaryActiveWord === null){
          this.placeFirstTile(`Coord`, activeCoord)
          this.placeSecondTile(`Coord`, activeCoord)
        }else {
          this.placeOtherTiles(`Coord`, activeCoord);
        }
      });
    });
  };

  placeFirstTile(interactedElement, activeDescriptor) {
    if (this.tile !== null && this.coord !== null) {
      this[`second${interactedElement}`] = activeDescriptor;
    }else {
      this[interactedElement.toLowerCase()] = activeDescriptor;
      if (this.tile !== null && this.coord !== null){
        this.putTileOnBoard(this.tile, this.coord);
        this.createSecondaryWords(this.tile, this.coord);
        console.log(this.primaryActiveWord);
        console.log(this.secondaryActiveWords);
      };
    };
  };

  placeSecondTile(interactedElement, activeDescriptor) {
    if (this.secondTile !== null && this.secondCoord !== null){
      let tempWords = this.createTempWords(this.secondTile, this.secondCoord);
      this.createPrimaryWordFromSecondary();
      if (this.primaryActiveWord === null){
        this.createPrimaryWordFromTemp(tempWords);
      };
      if (this.primaryActiveWord === null){
        this.primaryActiveWord = this.createActiveWord(this.tile, this.coord, this.secondTile, this.secondCoord);
      };
      if (this.primaryActiveWord !== null){
        this.putTileOnBoard(this.secondTile, this.secondCoord);
        tempWords = this.checkPrimaryActiveWordContainsTemp(tempWords);
        tempWords.forEach(word => {
          this.secondaryActiveWords.push(word);
        });
        this.tile = null;
        this.secondTile = null;
        this.coord = null;
        this.gameReady();
        console.log(this.primaryActiveWord);
        console.log(this.secondaryActiveWords);
      };
      this.secondCoord = null;
    };
  };

  placeOtherTiles(interactedElement, activeDescriptor){
    this[interactedElement.toLowerCase()] = activeDescriptor;
    if(this.tile !== null && this.coord !== null){
      const placedTile = {tile: this.tile, coord: this.coord};
      let tempWords = this.createTempWords(this.tile, this.coord);
      if (this.primaryActiveWord.addTile(placedTile)){
        this.putTileOnBoard(this.tile, this.coord);
        this.crawlExistingWords(this.primaryActiveWord);
        tempWords = this.checkPrimaryActiveWordContainsTemp(tempWords);
        tempWords.forEach(word => {
          this.secondaryActiveWords.push(word);
        });
        this.tile = null;
        console.log(this.primaryActiveWord);
        console.log(this.secondaryActiveWords);
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

  createPrimaryWordFromTemp(tempWords){
    const firstPlacedTile = {tile: this.tile, coord: this.coord};
    const secondPlacedTile = {tile: this.secondTile, coord: this.secondCoord};
    const possibleWordDirection = calculateDirection(this.coord, this.secondCoord);
    let removeIndex;
    tempWords.forEach((word, index) => {
      if(word.direction.x === possibleWordDirection.x && word.direction.y === possibleWordDirection.y){
        if(word.addTile(firstPlacedTile)){
          this.primaryActiveWord = word;
          removeIndex = index;
        };
      };
    });
    if(removeIndex !== undefined){
      tempWords.splice(removeIndex, 1);
      tempWords.forEach(word => {
        this.secondaryActiveWords.push(word);
      });
    }
  };

  checkPrimaryActiveWordContainsTemp(tempWords){
    let removalIndex;
    tempWords.forEach((word, index) => {
      if(word.direction.x === this.primaryActiveWord.direction.x && word.direction.y === this.primaryActiveWord.direction.y){
        removalIndex = index;
      }
    });
    if(removalIndex !== undefined){
      tempWords.splice(removalIndex, 1);
    }
    return tempWords;
  }

  putTileOnBoard(tile, coord){
    const tileOnBoard = {tile: tile, coord: coord};
    PubSub.publish('BoardView:tile-on-board', tileOnBoard);
    PubSub.publish('RackView:tile-on-board', null)
  };

  createSecondaryWords(tile, coord){
    const adjacentTiles = this.game.board.getAdjacentTiles(coord);
    adjacentTiles.forEach((adjacentTile) => {
      const secondaryActiveWord = this.createActiveWord(tile, coord, adjacentTile.tile, adjacentTile.coord);
      this.secondaryActiveWords.push(secondaryActiveWord);
    });
  };

  createTempWords(tile, coord){
    const tempWords = [];
    const adjacentTiles = this.game.board.getAdjacentTiles(coord);
    adjacentTiles.forEach((adjacentTile) => {
      const tempWord = this.createActiveWord(tile, coord, adjacentTile.tile, adjacentTile.coord);
      tempWords.push(tempWord);
    });
    return tempWords;
  };

  createActiveWord(firstTile, firstCoord, secondTile, secondCoord) {
    const firstPlacedTile = {tile: firstTile, coord: firstCoord};
    if(secondTile !== null && secondCoord !== null){
      const secondPlacedTile = {tile: secondTile, coord: secondCoord};
      let activeWord = new ActiveWord(firstPlacedTile, secondPlacedTile);
      if(activeWord.direction && activeWord.tiles){
        return activeWord = this.crawlExistingWords(activeWord);
      }
    }
    return null;
  }

  crawlExistingWords(word){
    const direction = otherDirection(Object.keys(word.direction)[0]);
    let beginningCoord = word.tiles[0].coord;
    let endCoord = word.tiles[word.tiles.length-1].coord;

    let adjacentTile = this.game.board.getTileBefore(direction, beginningCoord);
    while (adjacentTile !== null) {
      word.addTile(adjacentTile);
      beginningCoord = adjacentTile.coord;
      adjacentTile = this.game.board.getTileBefore(direction, beginningCoord);
    }
    adjacentTile = this.game.board.getTileAfter(direction, endCoord);
    while (adjacentTile !== null) {
      word.addTile(adjacentTile);
      endCoord = adjacentTile.coord;
      adjacentTile = this.game.board.getTileBefore(direction, endCoord);
    }
    return word;
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
