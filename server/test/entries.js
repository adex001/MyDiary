import chai from 'chai';
import chaiHttp from 'chai-http';
import { it, describe } from 'mocha';

// Import middleware
import TokenHandler from '../middleware/tokenhandler';

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
describe('Testing the GET /entries route', () => {
  it('It should return a status of 200', (done) => {
    chai.request(app)
      .get('/api/v1/entries')
      .set('Accept', 'application/json')
      .set('authorization', `JWT ${token}`)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });

  it('It should return an object as response', (done) => {
    chai.request(app)
      .get('/api/v1/entries')
      .set('Accept', 'application/json')
      .set('authorization', `JWT ${token}`)
      .end((err, response) => {
        response.should.be.an('object');
        done();
      });
  });
  it('It should return message "All entries by users"', (done) => {
    chai.request(app)
      .get('/api/v1/entries')
      .set('Accept', 'application/json')
      .set('authorization', `JWT ${token}`)
      .end((err, response) => {
        response.body.message.should.eql('All entries by users');
        done();
      });
  });
  it('Validation should fail because of invalid token', (done) => {
    chai.request(app)
      .get('/api/v1/entries')
      .set('Accept', 'application/json')
      .set('authorization', `JWT ${token}invalid`)
      .end((err, response) => {
        response.should.have.status(403);
        response.should.be.an('object');
        response.body.message.should.eql('Token cannot be verified');
        done();
      });
  });
  it('Should fail if no token is provided!', (done) => {
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
});

describe('Testing the GET /entries/:entriesID route', () => {
  let id = 1;
  it('It should return a status of 200', (done) => {
    chai.request(app)
      .get(`/api/v1/entries/${id}`)
      .set('Accept', 'application/json')
      .set('authorization', `JWT ${token}`)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });

  it('It should return an object as response', (done) => {
    chai.request(app)
      .get(`/api/v1/entries/${id}`)
      .set('Accept', 'application/json')
      .set('authorization', `JWT ${token}`)
      .end((err, response) => {
        response.should.be.an('object');
        done();
      });
  });
  it('It should return message `found entry`', (done) => {
    chai.request(app)
      .get(`/api/v1/entries/${id}`)
      .set('Accept', 'application/json')
      .set('authorization', `JWT ${token}`)
      .end((err, response) => {
        response.body.message.should.eql('found entry');
        done();
      });
  });
  it('It should return message `Entry not found and a status 404`', (done) => {
    id = 5646523;
    chai.request(app)
      .get(`/api/v1/entries/${id}`)
      .set('Accept', 'application/json')
      .set('authorization', `JWT ${token}`)
      .end((err, response) => {
        response.body.message.should.eql('entry not found');
        response.should.have.status(404);
        done();
      });
  });
});

describe('Create an entry with POST /entries route', () => {
  const postitem = {
    entriesId: 4,
    entriesTitle: 'A good man',
    entry: 'lorem ipsor',
    visibility: 'private',
    userId: 1,
  };
  it('It should return a status of 201', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .set('Accept', 'application/json')
      .set('authorization', `JWT ${token}`)
      .send(postitem)
      .end((err, response) => {
        response.should.have.status(201);
        response.should.be.an('object');
        done();
      });
  });

  it('It should return message `entry created successfully`', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .set('Accept', 'application/json')
      .set('authorization', `JWT ${token}`)
      .send(postitem)
      .end((err, response) => {
        response.body.message.should.eql('entry created successfully');
        done();
      });
  });
  it('It should return message `incomplete parameters` when incorrect details entered', (done) => {
    const errorEntry = {
      entriesId: 4,
      entriesTitle: '',
      entry: 'lorem ipsor',
      visibility: 'private',
      userId: 1,
    };
    chai.request(app)
      .post('/api/v1/entries')
      .set('Accept', 'application/json')
      .set('authorization', `JWT ${token}`)
      .send(errorEntry)
      .end((err, response) => {
        response.body.message.should.eql('Inomplete parameters entered or bad request');
        done();
      });
  });
});

describe('Testing the PUT /entries route', () => {
  const updateObject = {
    entriesTitle: 'Gods sent',
    entry: 'Remarkable',
    visibility: 'private',
  };
  it('It should return a status of 200', (done) => {
    chai.request(app)
      .put('/api/v1/entries/1')
      .set('Accept', 'application/json')
      .set('authorization', `JWT ${token}`)
      .send(updateObject)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });

  it('It should return an object as response', (done) => {
    chai.request(app)
      .put('/api/v1/entries/1')
      .set('Accept', 'application/json')
      .set('authorization', `JWT ${token}`)
      .send(updateObject)
      .end((err, response) => {
        response.should.be.an('object');
        done();
      });
  });
  it('It should return message `entry has been modified`', (done) => {
    chai.request(app)
      .put('/api/v1/entries/1')
      .set('Accept', 'application/json')
      .set('authorization', `JWT ${token}`)
      .send(updateObject)
      .end((err, response) => {
        response.body.message.should.eql('entry has been modified');
        done();
      });
  });

  it('It should return a status of 404', (done) => {
    chai.request(app)
      .put('/api/v1/entries/786554')
      .set('Accept', 'application/json')
      .set('authorization', `JWT ${token}`)
      .send(updateObject)
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
  });

  it('It should return an object as response', (done) => {
    chai.request(app)
      .put('/api/v1/entries/754543')
      .set('Accept', 'application/json')
      .set('authorization', `JWT ${token}`)
      .send(updateObject)
      .end((err, response) => {
        response.should.be.an('object');
        done();
      });
  });
  it('It should return message `entry not found`', (done) => {
    chai.request(app)
      .put('/api/v1/entries/68u453')
      .set('Accept', 'application/json')
      .set('authorization', `JWT ${token}`)
      .send(updateObject)
      .end((err, response) => {
        response.body.message.should.eql('entry not found');
        done();
      });
  });
});

describe('Testing the DELETE /entries/:entriesId route', () => {
  it('It should delete an entry successfully', (done) => {
    chai.request(app)
      .delete('/api/v1/entries/1')
      .set('Accept', 'application/json')
      .set('authorization', `JWT ${token}`)
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.an('object');
        response.body.message.should.eql('entry deleted successfully');
        done();
      });
  });

  it('It should return a status of 404 when unknown id entered', (done) => {
    chai.request(app)
      .delete('/api/v1/entries/4337769')
      .set('Accept', 'application/json')
      .set('authorization', `JWT ${token}`)
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
  });

  it('It should return an object as response', (done) => {
    chai.request(app)
      .delete('/api/v1/entries/23446867')
      .set('Accept', 'application/json')
      .set('authorization', `JWT ${token}`)
      .end((err, response) => {
        response.should.be.an('object');
        done();
      });
  });
  it('It should return message `entry not found.`', (done) => {
    chai.request(app)
      .delete('/api/v1/entries/634677')
      .set('Accept', 'application/json')
      .set('authorization', `JWT ${token}`)
      .end((err, response) => {
        response.body.message.should.eql('entry not found.');
        done();
      });
  });
});
