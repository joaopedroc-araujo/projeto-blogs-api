const ERROR_MESSAGE_TO_HTTP_STATUS = {
  '"displayName" length must be at least 8 characters long': 400,
  '"password" length must be at least 6 characters long': 400,
  '"email" must be a valid email': 400,
  'User already registered': 409,
};

module.exports = ERROR_MESSAGE_TO_HTTP_STATUS;