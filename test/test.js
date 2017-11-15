import request from 'supertest';
import "babel-polyfill";

const expressServer = require('./lib/index');

describe('loading express', () => {
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
});
