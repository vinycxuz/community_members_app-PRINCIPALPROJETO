const User = require('../models/user/user.model');
const asyncHandler = require('express-async-handler');

const isAccountVerified = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user)
    if(!user?.isEmailVerified){
      return res.status(400).json({ message: 'E-mail not verified' });
    }
    next()
  } catch {
    res.status(400).json({ message: 'E-mail not verified' });
  }
})

module.exports = isAccountVerified;