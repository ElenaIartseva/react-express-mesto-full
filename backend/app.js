require('dotenv').config(); // безопасность ключа
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { router } = require('./routes/index');
const limiter = require('./middlewares/rateLimiter');
const { errorHandler } = require('./middlewares/errorHandler');
const { corsOptions } = require('./utils/corsConfig');
const { csrfProtection } = require('./middlewares/csrf');

// env хранит все переменные окружения
const {
  PORT = 3000,
  MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

require('./utils/jwtSecret');

const app = express();

app.use(cors(corsOptions));

app.use(cookieParser()); // для чтения кук
app.use(helmet()); // для защиты приложения путем настройки заголовков HTTP
app.use(limiter); // ограничивает количество запросов с одного IP-адреса в единицу времени

const connectDatabase = () => mongoose.connect(MONGO_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger); // подключаем логгер запросов
app.use(csrfProtection);
app.use(router);
app.use(errorLogger); // подключаем логгер ошибок
app.use(errorHandler); // middleware для ошибок

const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      process.stdout.write(`Server listen port ${PORT}\n`);
    });
  } catch (err) {
    process.stderr.write(`MongoDB connection error: ${err.message}\n`);
    process.exit(1);
  }
};

if (require.main === module) {
  startServer();
}

module.exports = {
  app,
  connectDatabase,
  startServer,
};
