const dotenv = require("dotenv");
const pkg = require("jsonwebtoken");

dotenv.config(); 

const { sign } = pkg;

function secretToken(id) {
  return sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 3 * 24 * 60 * 60,
  });
}

module.exports = secretToken;