const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: true,
  },
  features: {
    type: Array,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  limitation: {
    type: String,
  },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Plan', planSchema);