const chai = require('chai');
const assert = require('assert');
const app = require('../../index');
const chaiHttp = require('chai-http');

const API = '/api/prueba-tyba-ms'

chai.use(chaiHttp);

describe('Health check controller tests', () => {
  it('successfully health check ', () => {
    const healthCheck = {
      name: 'prueba-tyba-ms',
      time: Date.now(),
      status: 'OK',
    };
    chai
      .request(app)
      .get(`${API}/`)
      .set('API_KEY', 'test')
      .then(res => {
        const { body, status } = res;

        assert.equal(body.name, healthCheck.name);
        assert.equal(status, 200);
      });
  });
});
