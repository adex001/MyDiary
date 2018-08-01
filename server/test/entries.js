import chai from 'chai';
import chaiHttp from 'chai-http';
import {
  it, describe, before, after,
} from 'mocha';

// Import middleware
import TokenHandler from '../middleware/tokenhandler';
import QueryHelper from '../utilities/queryhelper';

// import app
import app from '../app';

// configure app
app.use(chaiHttp);
chai.should();
const usertest = {
  username: 'testing',
  password: 'tester',
};

const token = TokenHandler.createToken(usertest);
describe('Testing Routes to make sure they are successful', () => {
  before(() => {
    // Empty all datas in the database
    QueryHelper.emptyTable('entries');
  });
  it('It should return a status of 404 and return no entry', (done) => {
    chai.request(app)
      .get('/api/v1/entries')
      .set('Accept', 'application/json')
      .set('authorization', `JWT ${token}`)
      .end((err, response) => {
        response.should.have.status(404);
        response.should.be.an('object');
        response.body.message.should.eql('No entry');
        // Should have property entries
        done();
      });
  });

  it('should return entry not found when entryid doesn\'t exist', (done) => {
    chai.request(app)
      .get('/api/v1/entries/10')
      .set('Accept', 'application/json')
      .set('authorization', `JWT ${token}`)
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
      userId: 1,
    };
    chai.request(app)
      .post('/api/v1/entries')
      .set('Accept', 'application/json')
      .set('authorization', `JWT ${token}`)
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
      userId: 1,
    };
    chai.request(app)
      .post('/api/v1/entries')
      .set('Accept', 'application/json')
      .set('authorization', `JWT ${token}`)
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
      userId: 1,
    };
    chai.request(app)
      .put('/api/v1/entries/2')
      .set('Accept', 'application/json')
      .set('authorization', `JWT ${token}`)
      .send(modifyEntry)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.message.should.eql('successfully updated');
        done();
      });
  });
  it('Should delete entry with entryid of 1', (done) => {
    chai.request(app)
      .delete('/api/v1/entries/1')
      .set('Accept', 'application/json')
      .set('authorization', `JWT ${token}`)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.message.should.eql('User Deleted!!');
        done();
      });
  });
  after(() => {
    // Empty all datas in the database
    QueryHelper.emptyTable('entries');
  });
});
describe('Token handlers', () => {
  it('gives "No token provided!" when token is not present in the header', (done) => {
    chai.request(app)
      .get('/api/v1/entries')
      .set('Accept', 'application/json')
      .end((err, response) => {
        response.should.have.status(403);
        response.should.be.an('object');
        response.body.message.should.eql('No token provided!');
        done();
      });
  });
  it('gives Token cannot be verified when wrong token is set', (done) => {
    const wrongToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRDVkOWQ3NDYwMyIsImlhdCI6MTUzMjc3NDMwMiwiZXhwIjoxNTMyNzc3OTAyfQ.2_MjI9xatS3YuMvRK2pL77548qBHFxZumVgQtZwHou4';
    chai.request(app)
      .get('/api/v1/entries')
      .set('Accept', 'application/json')
      .set('authorization', `JWT ${wrongToken}`)
      .end((err, response) => {
        response.should.have.status(403);
        response.should.be.an('object');
        response.body.message.should.eql('Token cannot be verified');
        done();
      });
  });
});
