const User = require('../models/user/user.model');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

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
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        const token = jwt.sign({ id: user._id }, process.env.secret_key, { expiresIn: '1h' });
        return res.json({ token });
      });
    })(req, res, next);
  }),
  
  getUsers: asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
  }),
};

module.exports = userController;
