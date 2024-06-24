const express = require('express');
const userRouter = express.Router();

const userController = require('../controllers/userController');

userRouter.post('/register', userController.register);
userRouter.post('/login/password', userController.login);
userRouter.get('/users', userController.getUsers);

module.exports = userRouter;
