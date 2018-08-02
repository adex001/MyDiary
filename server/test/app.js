import chai from 'chai';
import chaiHttp from 'chai-http';
import { it, describe } from 'mocha';

import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('Get the homepage and display a message', () => {
  it('should give a status 200', (done) => {
    chai.request(app)
      .get('/')
      .set('Accept', 'application/json')
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
  it('should give be an object', (done) => {
    chai.request(app)
      .get('/')
      .set('Accept', 'application/json')
      .end((err, response) => {
        response.should.be.an('object');
        done();
      });
  });
});

export default { chai, app };
