const Ajv = require('ajv');
const { BadRequestError } = require('./ErrorHandler');

const ajv = new Ajv({ removeAdditional: true, coerceTypes: true });

module.exports = (schema) => {
  const compiler = ajv.compile(schema);
  const validator = {
    validate: data => compiler(data),
    getError: () => compiler.errors,
    formatError() {
      const validationError = compiler.errors[0];
      const { message, dataPath } = validationError;

      return `${dataPath ? `${dataPath.replace('.', '')} ` : ''}${message.replace('.', '')}`;
    },
    validateRequest(payload, options = {}) {
      const isValid = compiler(payload);

      if (!isValid) {
        throw new BadRequestError(this.formatError());
      }

      return isValid;
    },
  };

  return validator;
};
