const chai = require('chai');
const assert = require('assert');
const app = require('../../index');
const Helper = require('../Helper');
const chaiHttp = require('chai-http');
const sandbox = require('sinon').createSandbox();

const UsersService = require('../../src/services/UsersService');
const AuthenticateService = require('../../src/services/AuthenticateService');
const TransactionsRepository = require('../../src/repositories/TransactionsRepository');
const AuthenticationsRepository = require('../../src/repositories/AuthenticationsRepository');

const API = '/api/prueba-tyba-ms'

chai.use(chaiHttp);

describe('Transactions controller tests', () => {
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
      document: 1234,
      password: '12345678',
    };
    const login = {
      document: 1234,
      password: '12345678',
    };
    await UsersService.create(user);
    const token = await AuthenticateService.login(login);
    sandbox.stub(AuthenticationsRepository, 'getToken').resolves(token);
    sandbox.stub(TransactionsRepository, 'findTransactionByUserIdPagined').resolves({
      total: 1,
      per_page: "1",
      offset: 0,
      to: 1,
      last_page: 1,
      current_page: "1",
      from: 0,
      data: [
        {
          id: "1",
          user_id: 1,
          city: "medellin",
          created_at: "2022-01-31T16:42:42.900Z",
          updated_at: "2022-01-31T16:42:42.900Z"
        }
      ]
    });

    chai
      .request(app)
      .get(`${API}/transactions`)
      .set('authorization', `Bearer ${token}`)
      .set('API_KEY', 'test')
      .then(res => {
        const { body, status } = res;

        assert.equal(body.total, 1);
        assert.equal(status, 200);
      });
  });
});
