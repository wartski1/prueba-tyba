const chai = require('chai');
const assert = require('assert');
const app = require('../../index');
const Helper = require('../Helper');
const chaiHttp = require('chai-http');
const sandbox = require('sinon').createSandbox();

const UsersService = require('../../src/services/UsersService');
const AuthenticateService = require('../../src/services/AuthenticateService');
const RestaurantProvider = require('../../src/provider/RestaurantProvider');
const AuthenticationsRepository = require('../../src/repositories/AuthenticationsRepository');

const API = '/api/prueba-tyba-ms'

chai.use(chaiHttp);

describe('Restaurants controller tests', () => {
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

  it('get transactions by userId', async () => {
    sandbox.stub(AuthenticationsRepository, 'createToken').resolves();
    const user = {
      name: 'Pedro',
      document: 12346,
      password: '12345678',
    };
    const login = {
      document: 12346,
      password: '12345678',
    };
    await UsersService.create(user);
    const token = await AuthenticateService.login(login);
    sandbox.stub(AuthenticationsRepository, 'getToken').resolves(token);
    sandbox.stub(RestaurantProvider, 'getByCity').resolves({
      data: [
        'Juan Valdez',
        'Presto',
      ],
      id: 'medellin',
    });

    chai
      .request(app)
      .get(`${API}/restaurants/medellin`)
      .set('authorization', `Bearer ${token}`)
      .set('API_KEY', 'test')
      .then(res => {
        const { body, status } = res;

        assert.ok(body.data);
        assert.equal(status, 200);
      });
  });
});
