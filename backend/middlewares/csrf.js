const crypto = require('crypto');
const ForbiddenError = require('../errors/ForbiddenError');
const { csrfCookieOptions } = require('../utils/cookies');

const CSRF_COOKIE_NAME = 'csrfToken';
const CSRF_HEADER_NAME = 'x-csrf-token';
const UNSAFE_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

const createCsrfToken = () => crypto.randomBytes(32).toString('hex');

const setCsrfToken = (res) => {
  const csrfToken = createCsrfToken();
  res.cookie(CSRF_COOKIE_NAME, csrfToken, csrfCookieOptions);
  return csrfToken;
};

const getCsrfToken = (req, res) => {
  res.send({ csrfToken: setCsrfToken(res) });
};

const csrfProtection = (req, res, next) => {
  if (!UNSAFE_METHODS.has(req.method)) {
    return next();
  }

  const cookieToken = req.cookies[CSRF_COOKIE_NAME];
  const headerToken = req.get(CSRF_HEADER_NAME);

  if (!cookieToken || !headerToken || cookieToken !== headerToken) {
    return next(new ForbiddenError('Некорректный CSRF-токен'));
  }

  return next();
};

module.exports = {
  getCsrfToken,
  csrfProtection,
};
