import chai from 'chai';
import chaiHttp from 'chai-http';
import { it, describe } from 'mocha';

// import app
import app from '../app';

// configure app
app.use(chaiHttp);
chai.should();
const usertest = {
  email: 'testing',
  password: 'tester',
};
const wrongPassword = {
  email: 'testing',
  password: 'wrongPassword',
};
const wrongUser = {
  email: 'wrong tester',
  password: 'anything',
};

const mockRegisterUser = {
  email: 'testing',
  firstname: 'Ayobami',
  lastname: 'Ebenezer',
  username: 'adex001',
  password: 'password',
};
const mockErrorUser = {
  email: 'error',
  password: 'password',
};

describe('Testing the POST /auth/signup route to CREATE A USER', () => {
  it('It should return a status of 201 when creating a new user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(mockRegisterUser)
      .end((err, response) => {
        response.should.have.status(201);
        response.should.be.an('object');
        response.body.message.should.eql('User signed up and token created');
        done();
      });
  });
  it('Validation fails with incorrect password!!', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(wrongPassword)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.message.should.eql('Validation failed');
        done();
      });
  });
  it('Validation fails with wrong user!!', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(wrongUser)
      .end((err, response) => {
        response.should.have.status(404);
        response.body.message.should.eql('User was not found');
        done();
      });
  });
});
// This should test invalid tokens
describe('Testing the POST /auth route to LOGIN A USER', () => {
  it('Validation should fail if user wasn\'t found', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send(mockErrorUser)
      .end((err, response) => {
        response.should.have.status(404);
        response.should.be.an('object');
        response.body.message.should.eql('User was not found');
        done();
      });
  });
  it('Login should be successful with correct details', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
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
      .set('Accept', 'application/json')
      .send(wrongPassword)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.message.should.eql('Validation failed');
        done();
      });
  });
});

// Should test no token
