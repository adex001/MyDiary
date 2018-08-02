import chai from 'chai';
import chaiHttp from 'chai-http';
import {
  it, describe, before, after,
} from 'mocha';

import QueryHelper from '../utilities/queryhelper';
import app from '../app';

app.use(chaiHttp);
chai.should();

const usertest = {
  email: 'testing@testing.com',
  plainPassword: 'password',
};
let token = null;
describe('Login to get token', () => {
  it('Login should be successful with correct details', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(usertest)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.message.should.eql('Token created');
        token = response.body.loginToken;
        done();
      });
  });
});

describe('Testing Routes to make sure they are successful', () => {
  before(() => {
    QueryHelper.emptyTable('entries');
  });
  it('It should return a status of 200 and return no entry', (done) => {
    chai.request(app)
      .get('/api/v1/entries')
      .set('Accept', 'application/json')
      .set('token', `${token}`)
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.an('object');
        response.body.message.should.eql('No entry');
        done();
      });
  });


  it('should return entry not found when entryid doesn\'t exist', (done) => {
    chai.request(app)
      .get('/api/v1/entries/10')
      .set('Accept', 'application/json')
      .set('token', `${token}`)
      .end((err, response) => {
        response.should.have.status(404);
        response.should.be.an('object');
        response.body.message.should.eql('No such entry');

        done();
      });
  });
  it('Should add an entry', (done) => {
    const goodEntry = {
      entryTitle: 'A good man',
      entry: 'lorem ipsor',
      visibility: 'private',
    };
    chai.request(app)
      .post('/api/v1/entries')
      .set('token', `${token}`)
      .send(goodEntry)
      .end((err, response) => {
        response.should.have.status(201);
        response.body.message.should.eql('Entries created successfully');
        done();
      });
  });

  it('Should add another entry', (done) => {
    const goodEntry1 = {
      entryTitle: 'Another good man',
      entry: 'lorem ipsor extra',
      visibility: 'public',
    };
    chai.request(app)
      .post('/api/v1/entries')
      .set('token', `${token}`)
      .send(goodEntry1)
      .end((err, response) => {
        response.should.have.status(201);
        response.body.message.should.eql('Entries created successfully');
        done();
      });
  });
  it('Should modify entry', (done) => {
    const modifyEntry = {
      entryTitle: 'Edited Another good man',
      entry: ' Modified lorem ipsor extra',
      visibility: 'public',
    };
    chai.request(app)
      .put('/api/v1/entries/2')
      .set('Accept', 'application/json')
      .set('token', `${token}`)
      .send(modifyEntry)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.message.should.eql('successfully updated');
        done();
      });
  });
});
describe('Token handlers', () => {
  it('gives "No token provided!" when token is not present in the header', (done) => {
    chai.request(app)
      .get('/api/v1/entries')
      .set('Accept', 'application/json')
      .end((err, response) => {
        response.should.have.status(401);
        response.should.be.an('object');
        response.body.message.should.eql('No token provided!');
        done();
      });
  });
});
QueryHelper.emptyTable('entries');