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

      const token = secretToken(user._id);

      res.cookie('secretToken', token, {
        httpOnly: false,
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

  googleAuth: passport.authenticate('google', { scope: ['profile'] }),

  googleAuthCallback: asyncHandler(async (req, res) => {
    passport.authenticate('google', 
      { 
        failureRedirect: '/login', 
        session: false,
      },
      (err, user, info) => {
        if (err) {
          return res.status(400).json({ message: err.message });
        }
        if (!user) {
          return res.redirect('http://localhost:5173/google-login-error');
        }

        const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET, {
          expiresIn: '3d'
        });

        res.cookie('token', token, {
          httpOnly: true,
          secure: false,
          sameSite: 'strict',
          maxAge: 24* 60 * 60 * 1000,
        });

        res.redirect('http://localhost:5173/dashboard');
      } 
    )(req, res, next);
    
  }),

  checkAuthenticated: asyncHandler(async (req, res) => {
    const token = req.cookies['secretToken'];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      if (user) {
        return res.status(200).json({isAuthenticated: true});
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  }),

  logout: asyncHandler(async (req, res) => {
    res.clearCookie('secretToken');
    res.status(200).json({ message: 'Logout success' });
  }),

  profile: asyncHandler(async (req, res) => {
    const user = await User.findById(req.user).populate('posts');
    res.status(200).json(user);
  }),
};

module.exports = userController;
