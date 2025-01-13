const jwt = require('jsonwebtoken');
const User = require('../models/user/user.model');
const dotenv = require('dotenv');

dotenv.config();

const authVerification = (req, res, next) => {
  const token = req.cookies.secretToken || req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Login Required' });
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      return res.status(401).json({ message: 'Login Require' });
    }
    const user = await User.findById(data.id);
    if(user)
      req.user = user?._id;
    
    next();
  })

}

module.exports = authVerification;