const User = require('../models/user/user.model');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
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
      _id: userRegistered._id,
      username: userRegistered.username,
      email: userRegistered.email,
      token: null
    });
  }),
  login: asyncHandler(async (req, res) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      if (!user) {
        res.status(401);
        return next(new Error(info.message));
      }
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
    );
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    });
    console.log(token);
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
},)
})};

module.exports = userController;
