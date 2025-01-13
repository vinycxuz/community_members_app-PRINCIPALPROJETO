const express = require('express');
const userRouter = express.Router();

const userController = require('../controllers/userController');
const authVerification = require('../middleware/AuthVerification');

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/users', userController.getUsers);
userRouter.get('/auth/google', userController.googleAuth);
userRouter.get('/auth/google/callback', userController.googleAuthCallback);
userRouter.get('/check-authenticated', userController.checkAuthenticated);
userRouter.post('/logout', userController.logout);
userRouter.get('/profile', authVerification, userController.profile);
userRouter.put('/follow/:followId', authVerification, userController.followUser);
userRouter.put('/unfollow/:unfollowId', authVerification, userController.unFollowUser);

module.exports = userRouter;
