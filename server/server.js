const path = require('path');
const fetch = require('node-fetch');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ApiKey = require('../api_key.js');

app.use(express.static(path.join(__dirname, '..', 'client', 'public')));
app.use(bodyParser.json());
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');

MongoClient.connect('mongodb://localhost:27017')
  .then((client) => {
    const db = client.db('scrabble');
    const gamesCollection = db.collection('games');
    app.use('/api/games', createRouter(gamesCollection));
  })
  .catch((err) => {
    console.error('Failed to connect to DB');
    console.error(err);
  });

  app.get('/validate/:word', (req, res) => {
    const url = 	`https://od-api.oxforddictionaries.com:443/api/v1/entries/en/${req.params.word}`
    const api = new ApiKey();

    fetch(url , {headers: {
     "Accept": "application/json",
     "app_id": api.apiID,
     "app_key": api.apiKey
      }})
       .then((res) => res.json())
       .then((data) => res.json(data))
       .catch((err) => {
         console.error(err);
       });
  });

app.listen(3000, function() {
  console.log(`Scrabble server running on port ${this.address().port}`);
});
