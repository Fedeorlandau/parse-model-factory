import request from 'supertest';
import 'babel-polyfill';

const expressServer = require('./lib/index');

describe('Testing all the model factory methods', () => {
  let server;
  beforeEach((done) => {
    if (!server) {
      expressServer()
        .then((serverIndex) => {
          server = serverIndex;
          done();
        });
    } else {
      done();
    }
  });
  it('should save an object', (done) => {
    request(server)
      .get('/save')
      .expect(200, done);
  });
  it('should find the object list', (done) => {
    request(server)
      .get('/find')
      .expect(200, done);
  });
  it('should get an object from the objects list', (done) => {
    request(server)
      .get('/get')
      .expect(200, done);
  });
  it('should count the objects', (done) => {
    request(server)
      .get('/count')
      .expect(200, done);
  });
  it('should get the first object', (done) => {
    request(server)
      .get('/first')
      .expect(200, done);
  });
  it('should save all the objects', (done) => {
    request(server)
      .get('/saveAll')
      .expect(200, done);
  });
  it('should destroy an object', (done) => {
    request(server)
      .get('/destroy')
      .expect(200, done);
  });
  it('should destroy all the objects', (done) => {
    request(server)
      .get('/destroyAll')
      .expect(200, done);
  });
});
