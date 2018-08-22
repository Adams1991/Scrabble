const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');


class ApiCheck {
  constructor() {
  }

  PubSub.subscribe('ApiCheck: word-to-be-checked', (evt) => {
    const word = evt.details;
    console.log(word);
    checkAPIforword(word)
  })

}

module.exports = ApiCheck;

function checkAPIforword(word) {
    let result = false;
    const url = `http://localhost:3000/validate/${word}`
    const request = new Request(url);
    request.get()
      .then((data) => {
        if(data.results.length === 1){
          result = true;
        }
        PubSub.publish('Submission: validation-results', result)
      })
}
