const { NODE_ENV } = process.env;

const authCookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: NODE_ENV === 'production',
  sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
};

const csrfCookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: false,
  secure: NODE_ENV === 'production',
  sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
};

module.exports = {
  authCookieOptions,
  csrfCookieOptions,
};
