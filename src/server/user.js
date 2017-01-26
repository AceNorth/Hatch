// const User = require('../db/Users.js');
const router = require('express').Router();

module.exports = router
  .get('/', (req, res, next) => {
    res.send('Hit Users Page')
    .catch(next);
    // User.findAll()
    // .then( users => {
    //   res.json(users)
    // })
    // .catch(next)
  });

