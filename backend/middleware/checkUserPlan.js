const User = require('../models/user/user.model');
const asyncHandler = require('express-async-handler');

const checkUserPlan = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user)
    if(!user?.hasSelectedPlan){
      return res.status(400).json({ message: 'Please select a plan to continue' });
    }
    next()
  } catch {
    res.status(400).json({ message: 'Please select a plan to continue' });
  }
})

module.exports = checkUserPlan;