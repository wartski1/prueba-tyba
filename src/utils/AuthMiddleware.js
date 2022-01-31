const authMiddleware = module.exports;

const moment = require('moment');
const jwt = require('jwt-simple');
const { UnauthorizedError, ForbiddenError } = require('./ErrorHandler');
const AuthenticationsRepository = require('../repositories/AuthenticationsRepository');

const { SECRET } = process.env;

authMiddleware.API_KEY = undefined;

authMiddleware.setApiKey = ((apiKey) => {
  authMiddleware.API_KEY = apiKey;
});

authMiddleware.apiKey = ((req, res, next) => {
  const apiKey = req.header('API_KEY');

  if (apiKey === authMiddleware.API_KEY) return next();

  throw new UnauthorizedError('Invalid Api Key');
});

authMiddleware.userAuth = (async (req, res, next) => {

  if (!req.headers.authorization) return next(new ForbiddenError());
  const token = req.headers.authorization.split(' ')[1];

  try {
    const payload = jwt.decode(token, SECRET);

    if (payload.exp <= moment().unix()) {
      return next(new UnauthorizedError('The token has expired'));
    }
    const tokenCached = await AuthenticationsRepository.getToken(payload.sub);  

    if (!tokenCached || tokenCached !== token) return next(new UnauthorizedError('The token is invalid'));
    req.user = payload;

    return next();
  } catch (error) {
    return next(new UnauthorizedError('The token is invalid'));
  }
});
