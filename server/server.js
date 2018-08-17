const path = require('path');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

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

app.listen(3000, function() {
  console.log(`ToDo List server running on port ${this.address().port}`);
});
