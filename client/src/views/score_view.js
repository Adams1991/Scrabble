class ScoreView {
  constructor(container) {
    this.container = container;
  }

  bindEvents(){
    createScoreTable(this.container);
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
  container.appendChild(table);


  const lead = document.createElement("div")
  lead.id = "lead-view"
  const leadLabel = document.createElement("label")
  leadLabel.textContent = "Lead : "
  leadLabel.htmlFor = "leadMargin"
  const leadScore = document.createElement("p")
  leadScore.id = "leadMargin"
  lead.appendChild(leadLabel);
  lead.appendChild(leadScore);
  container.appendChild(lead);



  const bag = document.createElement("div")
  bag.id = "bag"
  const bagLabel = document.createElement("label")
  bagLabel.textContent = "Tiles Remaining : "
  bagLabel.htmlFor = "remainingTiles"
  const bagScore = document.createElement("p")
  bagScore.id = "remainingTiles"
  bag.appendChild(bagLabel);
  bag.appendChild(bagScore);
  container.appendChild(bag);


}
