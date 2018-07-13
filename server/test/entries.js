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
});

describe('Testing the GET /entries/:entriesID route', () => {
  const id = 25;
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
  it('It should return message `Return an entry with a particular ID`', (done) => {
    chai.request(app)
      .get(`/api/v1/entries/${id}`)
      .set('Accept', 'application/json')
      .end((err, response) => {
        response.body.message.should.eql('Return an entry with a particular ID');
        done();
      });
  });
});

describe('Testing the POST /entries route', () => {
  const postitem = {id: 25};
  it('It should return a status of 200', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .set('Accept', 'application/json')
      .send(postitem)
      .end((err, response) => {
        response.should.have.status(200);
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
  it('It should return message `Return an entry with a particular ID`', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .set('Accept', 'application/json')
      .send(postitem)
      .end((err, response) => {
        response.body.message.should.eql('This is the entries post route');
        done();
      });
  });
});

describe('Testing the PUT /entries route', () => {
  const postitem = {id: 25};
  it('It should return a status of 200', (done) => {
    chai.request(app)
      .put('/api/v1/entries')
      .set('Accept', 'application/json')
      .send(postitem)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });

  it('It should return an object as response', (done) => {
    chai.request(app)
      .put('/api/v1/entries')
      .set('Accept', 'application/json')
      .send(postitem)
      .end((err, response) => {
        response.should.be.an('object');
        done();
      });
  });
  it('It should return message `Return an entry with a particular ID`', (done) => {
    chai.request(app)
      .put('/api/v1/entries')
      .set('Accept', 'application/json')
      .send(postitem)
      .end((err, response) => {
        response.body.message.should.eql('This is the entries PUT route');
        done();
      });
  });
});
