import chai from 'chai';
import chaiHttp from 'chai-http';
import {
  it, describe,
} from 'mocha';

import QueryHelper from '../utilities/queryhelper';
import app from '../app';

app.use(chaiHttp);
chai.should();

describe('Testing modify password', () => {
  it('should return message "Enter a valid email!"', (done) => {
    const noEmail = {
      email: '',
    };
    chai.request(app)
      .post('/api/v1/user/forgotpassword')
      .send(noEmail)
      .end((err, response) => {
        response.should.have.status(404);
        response.body.message.should.eql('No such email');
        done();
      });
  });
});
