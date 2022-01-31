module.exports = {
  title: 'userSchema',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 1,
    },
    document: {
      type: 'integer',
      minLength: 1,
    },
    password: {
      type: 'string',
      minLength: 8,
    },
  },
  required: [
    'name',
    'document',
    'password',
  ],
};