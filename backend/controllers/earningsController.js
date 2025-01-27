const asyncHandler = require('express-async-handler');
const Earning = require('../models/earning/Earning.model');

const getEarnings = asyncHandler(async (req, res) => {
  let earnings = await Earning.aggregate([
    {$group: {
      _id: "$user",
      totalAmount: {$sum: "$amount"},

    }},
    {$lookup: {
      from: 'users',
      localField: '_id',
      foreignField: '_id',
      as: 'user',
    }},
    {$unwind: '$user'

    },
    {$sort: {totalAmount: -1},
    }
  ])
  earnings = earnings.map((earning, index) => {
    return {
      ...earning,
      rank: index + 1,
    }
  })
  res.status(200).json(earnings);
});

module.exports = { getEarnings };