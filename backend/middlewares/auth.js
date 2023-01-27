const jwt = require('jsonwebtoken');
const Authorization = require('../errors/authorization');

const auth = (req, res, next) => {
  let payload;
  const { authorization } = req.headers;
  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      next(new Authorization('Необходима авторизация'));
    }
    const token = authorization.replace('Bearer ', '');
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    next(new Authorization('Необходима авторизация'));
  }
  req.user = payload;
  next();
};

module.exports = auth;
