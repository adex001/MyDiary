import chai from 'chai';
import chaiHttp from 'chai-http';

// import app
import app from '../app';

// configure app
app.use(chaiHttp);
chai.should();

describe('Testing the GET /entries route', () => {
  it('It should return a status of 200', (done) => {
    chai.request(app)
      .get('/api/v1/entries')
      .set('Accept', 'application/json')
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });

  it('It should return an object as response', (done) => {
    chai.request(app)
      .get('/api/v1/entries')
      .set('Accept', 'application/json')
      .end((err, response) => {
        response.should.be.an('object');
        done();
      });
  });
  it('It should return message "All entries by users"', (done) => {
    chai.request(app)
      .get('/api/v1/entries')
      .set('Accept', 'application/json')
      .end((err, response) => {
        response.body.message.should.eql('All entries by users');
        done();
      });
  });
});

describe('Testing the GET /entries/:entriesID route', () => {
  let id = 'sgdfw-frgrh-htkyk';
  it('It should return a status of 200', (done) => {
    chai.request(app)
      .get(`/api/v1/entries/${id}`)
      .set('Accept', 'application/json')
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });

  it('It should return an object as response', (done) => {
    chai.request(app)
      .get(`/api/v1/entries/${id}`)
      .set('Accept', 'application/json')
      .end((err, response) => {
        response.should.be.an('object');
        done();
      });
  });
  it('It should return message `found entry`', (done) => {
    chai.request(app)
      .get(`/api/v1/entries/${id}`)
      .set('Accept', 'application/json')
      .end((err, response) => {
        response.body.message.should.eql('found entry');
        done();
      });
  });
  it('It should return message `Entry not found and a status 404`', (done) => {
    id = 'should-give-me-error';
    chai.request(app)
      .get(`/api/v1/entries/${id}`)
      .set('Accept', 'application/json')
      .end((err, response) => {
        response.body.message.should.eql('entry not found');
        response.should.have.status(404);
        done();
      });
  });
});

describe('Create an entry with POST /entries route', () => {
  const postitem = {
    entriesTitle: 'Jesus is Lord',
    entry: 'This is not time to mess around, we must lend a helping hand, to these dying and confused world, lets rise up and show the light',
    visibility: 'public',
  };
  it('It should return a status of 201', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .set('Accept', 'application/json')
      .send(postitem)
      .end((err, response) => {
        response.should.have.status(201);
        done();
      });
  });

  it('It should return an object as response', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .set('Accept', 'application/json')
      .send(postitem)
      .end((err, response) => {
        response.should.be.an('object');
        done();
      });
  });
  it('It should return message `entry created successfully`', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .set('Accept', 'application/json')
      .send(postitem)
      .end((err, response) => {
        response.body.message.should.eql('entry created successfully');
        done();
      });
  });
});

describe('Testing the PUT /entries route', () => {
  let entryId = 'aaaaa-aaaaa-aaaaa';
  const updateObject = {
    entriesTitle: 'Gods sent',
    entry: 'Remarkable',
    visibility: 'private',
  };
  it('It should return a status of 200', (done) => {
    chai.request(app)
      .put('/api/v1/entries/aaaaa-aaaaa-aaaaa')
      .set('Accept', 'application/json')
      .send(updateObject)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });

  it('It should return an object as response', (done) => {
    chai.request(app)
      .put('/api/v1/entries/aaaaa-aaaaa-aaaaa')
      .set('Accept', 'application/json')
      .send(updateObject)
      .end((err, response) => {
        response.should.be.an('object');
        done();
      });
  });
  it('It should return message `entry has been modified`', (done) => {
    chai.request(app)
      .put('/api/v1/entries/aaaaa-aaaaa-aaaaa')
      .set('Accept', 'application/json')
      .send(updateObject)
      .end((err, response) => {
        response.body.message.should.eql('entry has been modified');
        done();
      });
  });

  it('It should return a status of 404', (done) => {
    chai.request(app)
      .put('/api/v1/entries/fbwbf-dnlsf-jeffe')
      .set('Accept', 'application/json')
      .send(updateObject)
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
  });

  it('It should return an object as response', (done) => {
    chai.request(app)
      .put('/api/v1/entries/fbwbf-dnlsf-jeffe')
      .set('Accept', 'application/json')
      .send(updateObject)
      .end((err, response) => {
        response.should.be.an('object');
        done();
      });
  });
  it('It should return message `entry not found`', (done) => {
    chai.request(app)
      .put('/api/v1/entries/fbwbf-dnlsf-jeffe')
      .set('Accept', 'application/json')
      .send(updateObject)
      .end((err, response) => {
        response.body.message.should.eql('entry not found');
        done();
      });
  });
});
