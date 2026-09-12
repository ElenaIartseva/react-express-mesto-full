const cardRoutes = require('express').Router();
const Joi = require('joi');
const { isValidUrl } = require('../utils/constants');
const { validate } = require('../middlewares/validate');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardRoutes.get('/', getCards);

cardRoutes.post('/', validate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().custom((value, helpers) => (
      isValidUrl(value) ? value : helpers.error('string.uri')
    )).required(),
  }),
}), createCard);

cardRoutes.delete('/:cardId', validate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), deleteCard);

cardRoutes.put('/:cardId/likes', validate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), likeCard);

cardRoutes.delete('/:cardId/likes', validate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), dislikeCard);

module.exports = cardRoutes;
