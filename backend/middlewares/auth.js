const jwt = require('jsonwebtoken');
const Authorization = require('../errors/authorization');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET = 'super-strong-secret' } = process.env;

const auth = (req, res, next) => {
  let payload;
  const { authorization } = req.headers;
  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return next(new Authorization('Необходима авторизация'));
    }
    const token = authorization.replace('Bearer ', '');
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret',
    );
  } catch (err) {
    return next(new Authorization('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
