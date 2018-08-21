const PubSub = require('../helpers/pub_sub.js');

class ScoreView {
  constructor(container) {
    this.container = container;
  }

  bindEvents(){
    createScoreTable(this.container);

    PubSub.subscribe(`ScoreView:update-scores`, (evt) => {
      const game = evt.detail;
      const players = game.players;
      const table = this.container.childNodes[0]
      const nameRow = table.childNodes[0];
      const scoreRow = table.childNodes[1];

      players.forEach(player => {
        const name = document.createElement(`th`);
        const score = document.createElement(`td`);
        name.textContent = player.name;
        score.textContent = player.score;
        nameRow.appendChild(name);
        scoreRow.appendChild(score);
      });

      const currentLead = game.determineLead();
      const lead = this.container.childNodes[1].childNodes[1];
      console.dir(this.container.childNodes);
      lead.textContent = currentLead;

      const remainingTiles = game.getNumberOfTilesInBag();
      const bag = this.container.childNodes[2].childNodes[1];
      bag.textContent = remainingTiles;
    });
  }

}

module.exports = ScoreView;

function createScoreTable(container) {

  const table = document.createElement("table");
  const nameRow = document.createElement("tr");
  nameRow.id = "name-row";
  const scoreRow = document.createElement("tr");
  scoreRow.id = "score-row";
  table.appendChild(nameRow);
  table.appendChild(scoreRow);

  const lead = document.createElement("div")
  lead.id = "lead-view"
  const leadLabel = document.createElement("p")
  leadLabel.textContent = "Lead"
  leadLabel.htmlFor = "leadMargin"
  const leadScore = document.createElement("p")
  leadScore.id = "leadMargin"
  lead.appendChild(leadLabel);
  lead.appendChild(leadScore);

  const bag = document.createElement("div")
  bag.id = "bag"
  const bagLabel = document.createElement("p")
  bagLabel.textContent = "Tiles"
  bagLabel.htmlFor = "remainingTiles"
  const bagScore = document.createElement("p")
  bagScore.id = "remainingTiles"
  bag.appendChild(bagLabel);
  bag.appendChild(bagScore);

  container.appendChild(table);
  container.appendChild(lead);
  container.appendChild(bag);

};
