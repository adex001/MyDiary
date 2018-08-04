import chai from 'chai';
import chaiHttp from 'chai-http';
import {
  it, describe, before,
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
      visibility: 'true',
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
      visibility: 'false',
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
  it('Should not modify entry', (done) => {
    const modifyEntry = {
      entryTitle: 'Edited Another good man',
      entry: ' Modified lorem ipsor extra',
      visibility: 'true',
    };
    chai.request(app)
      .put('/api/v1/entries/9236329')
      .set('Accept', 'application/json')
      .set('token', `${token}`)
      .send(modifyEntry)
      .end((err, response) => {
        response.should.have.status(404);
        response.body.message.should.eql('entry not found');
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
describe('Count Tests', () => {
  it('return count of entries', (done) => {
    chai.request(app)
      .get('/api/v1/entries/count')
      .set('Accept', 'application/json')
      .set('token', `${token}`)
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.an('object');
        response.body.message.should.eql('Entries count');
        done();
      });
  });
});
describe('Delete Route', () => {
  it('SHould return entry not found with a status of 404', (done) => {
    chai.request(app)
      .delete('/api/v1/entries/5678')
      .set('Accept', 'application/json')
      .set('token', `${token}`)
      .end((err, response) => {
        response.should.have.status(404);
        response.should.be.an('object');
        response.body.message.should.eql('Entry not found!!');
        done();
      });
  });
});
describe('Signup Errors', () => {
  const errorObject = {
    password: 'password',
    username: 'adeded',
  };
  it('should give error message: Enter a valid email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(errorObject)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.message.should.eql('Enter a valid email');
        done();
      });
  });
});
describe('User Tests', () => {
  const email = '';
  it('returns Enter a valid email', (done) => {
    chai.request(app)
      .post('/api/v1/user/forgotpassword')
      .send(email)
      .end((err, response) => {
        response.body.message.should.be.eql('No such email');
        response.should.have.status(404);
        done();
      });
  });
  it('returns an invalid email', (done) => {
    const updateUser = {
      firstname: 'Ebenezer',
      lastname: 'Temitope',
      sex: 'Male',
    };
    chai.request(app)
      .post('/api/v1/user/modifyprofile')
      .set('token', `${token}`)
      .send(updateUser)
      .end((err, response) => {
        response.body.message.should.be.eql('User updated successfully');
        response.should.have.status(200);
        done();
      });
  });
});
QueryHelper.emptyTable('entries');
