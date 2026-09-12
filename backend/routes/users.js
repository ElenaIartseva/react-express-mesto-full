const userRoutes = require('express').Router();
const Joi = require('joi');
const { isValidUrl } = require('../utils/constants');
const { validate } = require('../middlewares/validate');
const {
  getUsers,
  getUserMe,
  getUserId,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

userRoutes.get('/', getUsers);
userRoutes.get('/me', getUserMe);

userRoutes.get('/:userId', validate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUserId);

userRoutes.patch('/me', validate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUser);

userRoutes.patch('/me/avatar', validate({
  body: Joi.object().keys({
    avatar: Joi.string().custom((value, helpers) => (
      isValidUrl(value) ? value : helpers.error('string.uri')
    )).required(),
  }),
}), updateUserAvatar);

module.exports = userRoutes;
