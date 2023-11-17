const { OAuth2Client } = require('google-auth-library');
const { compHash } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { User } = require('../models/index');

class userController {
  static async register(req, res, next) {
    try {
      const { fullName, username, email, password } = req.body;
      const reg = await User.create({
        username,
        email,
        password,
        fullName,
      });

      const data = await User.findOne({
        where: { email },
        attributes: { exclude: ['password'] },
      });

      res.status(201).json({
        message: 'An user has been added',
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw new Error('emptyEmail');
      if (!password) throw new Error('emptyPass');

      const log = await User.findOne({ where: { email } });

      if (!log) throw new Error('LoginError');
      if (!compHash(password, log.password)) throw new Error('LoginError');

      const token = signToken({
        id: log.id,
        username: log.username,
      });

      res.status(200).json({
        token,
      });
    } catch (err) {
      next(err);
    }
  }

  static async googleLog(req, res, next) {
    try {
      const { token } = req.headers;
      const client = new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        'postmessage'
      );

      const exchangedToken = await client.getToken(token);

      const ticket = await client.verifyIdToken({
        idToken: exchangedToken.tokens.id_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          email: payload.email,
          fullName: payload.name,
          password: 'norepinephrine',
        },
        hooks: false,
      });

      const access_token = signToken({
        id: user.id,
        fullName: user.fullName,
      });

      res.status(200).json(access_token);
    } catch (err) {
      next(err);
    }
  }

  static async twitterLog(req, res, next) {
    try {
      const { email, username, fullName } = req.body;

      console.log(email);

      const [user, created] = await User.findOrCreate({
        where: { email },
        default: {
          email,
          fullName,
          username,
          password: 'norepinephrine',
        },
        hooks: false,
      });

      const token = signToken({
        id: user.id,
        fullName: user.fullName,
      });

      res.status(200).json({
        token,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = userController;
