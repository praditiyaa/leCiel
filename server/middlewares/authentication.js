const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');

const authentication = async (req, _, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) throw new Error('Unauthenticate');

    const access_token = authorization.split(' ')[1];
    const ver = verifyToken(access_token);

    const user = await User.findByPk(ver.id);
    if (!user) throw new Error('IdNotFound');

    const { id, username } = user;
    req.loginInfo = { userId: id, username };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
