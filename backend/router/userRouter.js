const express = require('express');
const userRouter = express.Router();

const userController = require('../controllers/userController');

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/users', userController.getUsers);
userRouter.get('/auth/google', userController.googleAuth);
userRouter.get('/auth/google/callback', userController.googleAuthCallback);
userRouter.get('/check-authenticated', userController.checkAuthenticated);

module.exports = userRouter;
