const routerSignin = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login, logout } = require('../controllers/users');

routerSignin.post('/signout', logout);

routerSignin.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), login);

module.exports = routerSignin;
