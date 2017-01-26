const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const db = require('../db/db')

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())

app.use(express.static('public'))
app.use('/api', require('./api'))

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../index.html'))
});

db.sync()
    .then(function(){
      app.listen(1333);
        console.log('Server is listening on port 1333');

    })
    .catch(console.error);


module.exports = app;



