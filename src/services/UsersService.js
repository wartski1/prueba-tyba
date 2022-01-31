const UserService = module.exports;

const bcrypt = require('bcrypt');
const log4j = require('../utils/Logger');
const { BadRequestError } = require('../utils/ErrorHandler');
const UserRepository = require('../repositories/UsersRepository');

const defaultLogger = log4j.getLogger('UserService');

UserService.create = async (user, options = {}) => {
  const { document } = user;
  const { logger = defaultLogger } = options;
  logger.info(`Create user: ${JSON.stringify(user)}`);

  const userRegisted = await UserRepository.findUserByDocument(document);
  if (userRegisted) throw new BadRequestError('the user trying to register is already registered');

  user.password = UserService.encodePassword(user.password);

  return UserRepository.create(user);
};

UserService.encodePassword = password => bcrypt.hashSync(password, 5);
