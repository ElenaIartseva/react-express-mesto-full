const { NODE_ENV, CORS_ORIGINS } = process.env;

const allowedOrigins = CORS_ORIGINS
  ? CORS_ORIGINS.split(',').map((origin) => origin.trim())
  : [];

const isLocalhostOrigin = (origin) => /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);

const corsOptions = {
  origin(origin, callback) {
    if (!origin) {
      callback(null, true);
      return;
    }

    const isAllowed = NODE_ENV === 'development'
      ? isLocalhostOrigin(origin) || allowedOrigins.includes(origin)
      : allowedOrigins.includes(origin);

    if (isAllowed) {
      callback(null, true);
      return;
    }

    callback(new Error('Not allowed by CORS'));
  },
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
  credentials: true,
};

module.exports = { corsOptions };
