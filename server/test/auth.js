import chai from 'chai';
import chaiHttp from 'chai-http';
import { it, describe } from 'mocha';

import app from '../app';
import QueryHelper from '../utilities/queryhelper';

app.use(chaiHttp);
chai.should();
const usertest = {
  email: 'testing@testing.com',
  plainPassword: 'password',
};
const noEmail = {
  firstname: 'Ayobami',
  lastname: 'Ebenezer',
  username: 'adex001',
  plainPassword: 'password',
  email: '',
};
const wrongPassword = {
  email: 'testing@testing.com',
  plainPassword: 'anything',
};

const mockRegisterUser = {
  email: 'testing@testing.com',
  firstname: 'Ayobami',
  lastname: 'Ebenezer',
  username: 'adextest1',
  plainPassword: 'password',
};
const mockErrorUser = {
  email: 'error@error.com',
  plainPassword: 'password',
};
QueryHelper.emptyTable('users');
describe('Testing the POST /auth/signup route to CREATE A USER', () => {
  it('should return a status of 201 when creating a new user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockRegisterUser)
      .end((err, response) => {
        response.should.have.status(201);
        response.should.be.an('object');
        response.body.message.should.eql('User signed up and token created');
        done();
      });
  });
  it('It should not create a user with no email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(noEmail)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.message.should.eql('Enter a valid email');
        done();
      });
  });
});

describe('Testing the POST /auth route to LOGIN A USER', () => {
  it('Validation should fail if user wasn\'t found', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(mockErrorUser)
      .end((err, response) => {
        response.should.have.status(404);
        response.should.be.an('object');
        response.body.message.should.eql('Login failed! No such email');
        done();
      });
  });
  it('Login should be successful with correct details', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(usertest)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.message.should.eql('Token created');
        done();
      });
  });
  it('Validation fails with incorrect password!!', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(wrongPassword)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.message.should.eql('Login failed!');
        done();
      });
  });
});
QueryHelper.emptyTable('users');