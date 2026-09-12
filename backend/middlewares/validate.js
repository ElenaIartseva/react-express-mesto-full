const ValidationError = require('../errors/ValidationError');

const validate = (schema) => (req, res, next) => {
  const segments = Object.keys(schema);
  const validatedValues = {};

  const hasError = segments.some((segment) => {
    const { error, value } = schema[segment].validate(req[segment], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return true;
    }

    validatedValues[segment] = value;
    return false;
  });

  if (hasError) {
    return next(new ValidationError('Переданы некорректные данные'));
  }

  segments.forEach((segment) => {
    req[segment] = validatedValues[segment];
  });

  return next();
};

module.exports = { validate };
