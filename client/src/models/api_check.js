const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');


class ApiCheck {
  constructor() {
  }

  bindEvents() {
    PubSub.subscribe('ApiCheck:word-to-be-checked', (evt) => {
      const words = evt.detail;
      const promises = words.map((word) => {
        return checkAPIforword(word.getWord());
      })
      Promise.all(promises)
        .then((data) => {
          const isDataValid = data.every((res) => {
            return res.isValid
          })
          PubSub.publish('Submission:validation-results', isDataValid)
        })
        .catch((err) => {
          console.log(err);
        })
    })
  }

}

module.exports = ApiCheck;

function checkAPIforword(word) {
    const url = `http://localhost:3000/validate/${word}`
    const request = new Request(url);
   return request.get()
}
