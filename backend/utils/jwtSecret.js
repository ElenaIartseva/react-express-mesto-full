const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET must be set in .env');
}

module.exports = JWT_SECRET;
