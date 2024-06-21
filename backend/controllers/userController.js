const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

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
}

module.exports = userController;
