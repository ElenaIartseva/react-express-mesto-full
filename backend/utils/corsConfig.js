const { NODE_ENV, CORS_ORIGINS } = process.env;

const productionOrigins = [
  'http://fifteen.nomoredomainsrocks.ru',
  'https://fifteen.nomoredomainsrocks.ru',
];

const allowedOrigins = CORS_ORIGINS
  ? CORS_ORIGINS.split(',').map((origin) => origin.trim())
  : productionOrigins;

const isLocalhostOrigin = (origin) => /^https?:\/\/localhost:\d+$/.test(origin);

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
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

module.exports = { corsOptions };
