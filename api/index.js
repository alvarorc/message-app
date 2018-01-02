const Router = require('express').Router;
const userController = require('./user/controller');


const router = new Router();

router.use('/users', userController);

module.exports = router;
