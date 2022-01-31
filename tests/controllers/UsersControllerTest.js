const chai = require('chai');
const assert = require('assert');
const app = require('../../index');
const Helper = require('../Helper');
const chaiHttp = require('chai-http');
const sandbox = require('sinon').createSandbox();

const UsersService = require('../../src/services/UsersService');

const API = '/api/prueba-tyba-ms'

chai.use(chaiHttp);

describe('User controller tests', () => {
  before(async () => {
    await Helper.migrate();
  });

  beforeEach(async () => { await Helper.clear(); });

  afterEach(() => {
    sandbox.restore();
  });

  after(() => Helper.clean());

  it('successfully create ', () => {
    const user = {
      name: 'Pedro',
      document: 12345,
      password: '12345678',
    };
    chai
      .request(app)
      .post(`${API}/create`)
      .send(user)
      .set('API_KEY', 'test')
      .then(res => {
        const { body, status } = res;

        assert.equal(body[0].name, user.name);
        assert.equal(body[0].document, user.document);
        assert.equal(status, 200);
      });
  });

  it('created with invalid fields', () => {
    const user = {
      name: 'Pedro',
      document: 12345,
    };
    chai
      .request(app)
      .post(`${API}/create`)
      .send(user)
      .set('API_KEY', 'test')
      .then(error => {
        const { status, body } = error;

        assert.equal(status, 400);
        assert.equal(body.error.message, "should have required property 'password'");
      })
  });

  it('Create existing user', async () => {
    const user = {
      name: 'Pedro',
      document: 12345,
      password: '12345678',
    };
    await UsersService.create(user);

    chai
      .request(app)
      .post(`${API}/create`)
      .send(user)
      .set('API_KEY', 'test')
      .then(error => {
        const { status, body } = error;

        assert.equal(status, 400);
        assert.equal(body.error.message, 'the user trying to register is already registered');
      })
  });
});
