const validator = require('validator');

const isValidUrl = (url) => validator.isURL(url, {
  protocols: ['http', 'https'],
  require_protocol: true,
  require_tld: false,
});

module.exports = { isValidUrl };
