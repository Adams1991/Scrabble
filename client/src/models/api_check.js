const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');


class ApiCheck {
  constructor() {
  }

  PubSub.subscribe('ApiCheck:word-to-be-checked', (evt) => {
    const word = evt.details;
    checkAPIforword(word)
  })

}

module.exports = ApiCheck;

function checkAPIforword(word) {
    const url = `http://localhost:3000/validate/${word}`
    const request = new Request(url);
    request.get()
      .then((data) => {
        const result = data.results.length > 0;
        PubSub.publish('Submission:validation-results', result)
        console.log(result);
      })
}
