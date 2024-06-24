const User = require('../models/user/user.model');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const userController = {
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({
      email, username
    });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const userRegistered = await User.create({
      username,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      userRegistered,
      message: 'User registered successfully'
    });
  }),

  login: asyncHandler(async (req, res, next) => {
    passport.authenticate('local', { failureFlash: true },)
}),
  getUsers: asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
  }),
};

module.exports = userController;
