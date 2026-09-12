const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');
const routerSignup = require('./signup');
const routerSignin = require('./signin');
const { auth } = require('../middlewares/auth');
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const { getCsrfToken } = require('../middlewares/csrf');

router.get('/csrf-token', getCsrfToken);
router.use('/', routerSignup);
router.use('/', routerSignin);
router.use('/users', auth, userRoutes);
router.use('/cards', auth, cardRoutes);

router.use((req, res, next) => {
  next(new NotFoundError('Неверный адрес запроса'));
});

module.exports = { router };
