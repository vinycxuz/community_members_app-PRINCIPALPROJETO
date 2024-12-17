const User = require('../models/user/user.model');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const secretToken = require('../utils/secretToken');

dotenv.config();

const userController = {
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ email }); // Check by email only
    try {
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashedPassword });

    const createSecretToken = secretToken(newUser._id);
    res.cookie('secretToken', createSecretToken, {
      httpOnly: false,
      withCredentials: true
    });

    res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }

  }),

  login: asyncHandler(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if(!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
      }
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ message: 'invalid user or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'invalid user or password' });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '3d'
      });

      res.cookie('token', token, {
        httpOnly: true,
        withCredentials: true
      });

      res.status(200).json({ message: 'Login success' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }}),
  
  getUsers: asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
  }),
};

module.exports = userController;
