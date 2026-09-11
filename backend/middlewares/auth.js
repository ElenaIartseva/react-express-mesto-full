const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../utils/jwtSecret');
const AuthorizationError = require('../errors/AuthorizationError');

function auth(req, res, next) {
  const { authorization } = req.headers;
  const cookieToken = req.cookies.authorization;
  const bearerToken = authorization && authorization.startsWith('Bearer ')
    ? authorization.replace('Bearer ', '')
    : null;
  const token = cookieToken || bearerToken;

  if (!token) {
    return next(new AuthorizationError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new AuthorizationError('С токеном что-то не так'));
  }
  req.user = payload;
  return next();
}

module.exports = { auth };
