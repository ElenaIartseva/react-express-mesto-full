const routerSignup = require('express').Router();
const Joi = require('joi');
const { isValidUrl } = require('../utils/constants');
const { validate } = require('../middlewares/validate');
const { createUsers } = require('../controllers/users');

routerSignup.post('/signup', validate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((value, helpers) => (
      isValidUrl(value) ? value : helpers.error('string.uri')
    )),
  }),
}), createUsers);

module.exports = routerSignup;
