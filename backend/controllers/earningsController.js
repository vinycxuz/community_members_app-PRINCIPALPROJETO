const asyncHandler = require('express-async-handler');
const Earning = require('../models/earning/Earning.model');

const getEarnings = asyncHandler(async (req, res) => {
  const earnings = await Earning.find();
  res.status(200).json(earnings);
});

module.exports = { getEarnings };