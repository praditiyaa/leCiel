const jwt = require('jsonwebtoken');
const key = process.env.SECRET_KEY;

const signToken = (val) => {
  return jwt.sign(val, key);
};

const verifyToken = (val) => {
  return jwt.verify(val, key);
};

module.exports = {
  signToken,
  verifyToken,
};
