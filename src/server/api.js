const api = require('express').Router();

api
  .use('/user', require('./user'))
  .use('/message', require('./message'))

// Send along any errors
api.use((err, req, res, next) => {
  console.error(err, err.stack);
  res.status(500).send(err);
});

api.use((req, res) => res.status(404).end());

module.exports = api;

