const dotenv = require("dotenv");
const pkg = require("jsonwebtoken");

require("dotenv").config();

const { sign } = pkg;
dotenv.config();

export function secretToken(id) {
  return sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 3 * 24 * 60 * 60,
  });
}