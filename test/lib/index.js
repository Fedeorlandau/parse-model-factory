import express from 'express';
import MongoInMemory from 'mongo-in-memory';
import ModelFactory from '../../index';

const ParseServer = require('parse-server').ParseServer;

const modelProperties = {
  defaultIncludes: ['prop1', 'prop2'],
};

const objectProperties = {
  toStringCustom() {
    const prop = this.get('prop');
    return `Your prop is ${prop}`;
  },
};
const TestObject = ModelFactory.generate('TestObject', modelProperties, objectProperties);

module.exports = async () => {
  const app = express();
  const port = 8000;
  const mongoServerInstance = new MongoInMemory(port); // DEFAULT PORT is 27017
  await mongoServerInstance.start();
  const mongouri = mongoServerInstance.getMongouri('myDatabaseName');
  const api = new ParseServer({
    databaseURI: mongouri,
    appId: 'myAppId',
    masterKey: 'myMasterKey',
    fileKey: 'optionalFileKey',
    restAPIKey: 'java',
    serverURL: 'http://localhost:1337/parse',
  });
  app.use('/parse', api);
  app.get('/save', async (req, res) => {
    try {
      const testObject = new TestObject();
      testObject.set('prop', new Date());
      if (await TestObject.save(testObject)) {
        res.status(200).send();
      } else {
        throw new Error("Couldn't save object");
      }
    } catch (e) {
      res.status(500).send(e.message);
    }
  });

  app.get('/find', async (req, res) => {
    try {
      const testObjects = await TestObject._find(TestObject._query());
      if (testObjects) {
        res.status(200).send();
      } else {
        throw new Error("Couldn't find the objects");
      }
    } catch (e) {
      res.status(500).send(e.message);
    }
  });
  return app.listen(1337);
};
