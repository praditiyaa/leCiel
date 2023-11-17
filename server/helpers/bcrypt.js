const bcrypt = require('bcryptjs');

const hash = (val) => {
  return bcrypt.hashSync(val);
};

const compHash = (val, hashed) => {
  return bcrypt.compareSync(val, hashed);
};

module.exports = {
  hash,
  compHash,
};
