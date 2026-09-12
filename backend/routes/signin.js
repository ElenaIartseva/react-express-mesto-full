const routerSignin = require('express').Router();
const Joi = require('joi');
const { validate } = require('../middlewares/validate');
const { login, logout } = require('../controllers/users');

routerSignin.post('/signout', logout);

routerSignin.post('/signin', validate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), login);

module.exports = routerSignin;
