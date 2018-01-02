const express = require('express');
const UserServices = require('./services');
const router = express.Router();

router.get('/', (req, res, next) => {
  UserServices
    .getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
});

router.get('/:id', (req, res, next) => {
  const userId = req.params.id;

  UserServices
    .getOneById({ id: userId })
    .then(user => res.json(user))
    .catch(err => next(err));
});

module.exports = router;
