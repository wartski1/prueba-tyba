const chai = require('chai');
const assert = require('assert');
const app = require('../../index');
const Helper = require('../Helper');
const chaiHttp = require('chai-http');
const sandbox = require('sinon').createSandbox();

const UsersService = require('../../src/services/UsersService');
const AuthenticateService = require('../../src/services/AuthenticateService');
const AuthenticationsRepository = require('../../src/repositories/AuthenticationsRepository');

const API = '/api/prueba-tyba-ms'

chai.use(chaiHttp);

describe('Authenticate controller tests', () => {
  before(async () => {
    await Helper.migrate();
  });

  beforeEach(async () => { 
    await Helper.clear();
    await Helper.clearCache();
  });

  afterEach(() => {
    sandbox.restore();
  });

  after( async () => {
    await Helper.clean();
    await Helper.clearCache();
  });

  it('login existing user', async () => {
    const user = {
      name: 'Pedro',
      document: 12345,
      password: '12345678',
    };
    await UsersService.create(user);
    const login = {
      document: 12345,
      password: '12345678',
    };
    chai
      .request(app)
      .post(`${API}/login`)
      .send(login)
      .set('API_KEY', 'test')
      .then(res => {
        const { body, status } = res;

        assert.ok(body);
        assert.equal(status, 200);
      })
  });

  it('login not existing user', async () => {
    const login = {
      document: 1234,
      password: '12345678',
    };
    chai
      .request(app)
      .post(`${API}/login`)
      .send(login)
      .set('API_KEY', 'test')
      .then(error => {
        const { status, body } = error;

        assert.equal(body.error.message, 'Invalid username or password');
        assert.equal(status, 404);
      })
  });

  it('logout', async () => {
    sandbox.stub(AuthenticationsRepository, 'createToken').resolves();

    const user = {
      name: 'Pedro',
      document: 12345,
      password: '12345678',
    };
    const login = {
      document: 12345,
      password: '12345678',
    };
    await UsersService.create(user);
    const token = await AuthenticateService.login(login);

    chai
      .request(app)
      .get(`${API}/logout`)
      .set('API_KEY', 'test')
      .set('authorization', `Bearer ${token}`)
      .then(res => {
        const { body, status } = res;

        assert.ok(body);
        assert.equal(status, 200);
      });
  });
});
