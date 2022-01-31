const AuthenticateService = module.exports;

const moment = require('moment');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const log4j = require('../utils/Logger');
const { NotFoundError } = require('../utils/ErrorHandler');
const UserRepository = require('../repositories/UsersRepository');
const AuthenticationRepository = require('../repositories/AuthenticationsRepository');

const defaultLogger = log4j.getLogger('AuthenticationsService');

const { SECRET } = process.env;

AuthenticateService.createToken = user => {
  const payload = {
    sub: user.id,
    name: user.name,
    document: user.document,
    iat: moment().unix(),
    exp: moment().add(1, 'hours').unix(),
  };

  return jwt.encode(payload, SECRET);
};

AuthenticateService.login = async (user, options = {}) => {
  const { logger = defaultLogger } = options;
  const { document, password } = user;
  logger.info(`Login user: ${JSON.stringify(user)}`);
  const userRegisted = await UserRepository.findUserByDocument(document);
  
  if (!userRegisted || !bcrypt.compareSync(password, userRegisted.password)) {
    throw new NotFoundError('Invalid username or password');
  }

  delete userRegisted.password;
  const token = AuthenticateService.createToken(userRegisted);
  await AuthenticationRepository.createToken(userRegisted.id, token, options);

  return token;
};

AuthenticateService.logout = async (user, options = {}) => {
  const { logger = defaultLogger } = options;
  const { sub } = user;
  logger.info(`logout user: ${JSON.stringify(user)}`);

  return AuthenticationRepository.deleteToken(sub, options);
};
