const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.STRING_CONNECTION)
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error connecting to MongoDB', error.message);
  }
}

module.exports = dbConnect;