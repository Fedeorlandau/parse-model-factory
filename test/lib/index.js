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

module.exports = () => {
  const createServer = async () => {
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

    app.get('/find', async (req, res) => {
      try {
        const testObjects = await TestObject._find(TestObject._query());
        if (testObjects) {
          res.status(200).send();
        } else {
          throw new Error("Couldn't find the objects");
        }
      } catch (e) {
        res.status(404).send(e.message);
      }
    });

    app.get('/get', async (req, res) => {
      try {
        const testObjects = await TestObject._find(TestObject._query());
        if (testObjects) {
          const testObjects = await TestObject._get(TestObject._query(), testObjects[0].id);
          const testRegularObjects = await TestObject._getRegular({}, TestObject._query(), testObjects[0].id);
          if (testObjects && testRegularObjects && testRegularObjects.id != testObjects.id) {
            res.status(200).send();
          } else {
            throw new Error("Couldn't get the object");
          }
        } else {
          throw new Error("Couldn't find the objects");
        }
      } catch (e) {
        res.status(404).send(e.message);
      }
    });

    app.get('/count', async (req, res) => {
      try {
        const testObjects = await TestObject._count(TestObject._query());
        const testRegularObjects = await TestObject._countRegular({}, TestObject._query());
        if (testObjects && testRegularObjects && testRegularObjects.id != testObjects.id) {
          res.status(200).send();
        } else {
          throw new Error("Couldn't count the objects");
        }
      } catch (e) {
        res.status(404).send(e.message);
      }
    });

    app.get('/first', async (req, res) => {
      try {
        const testObjects = await TestObject._first(TestObject._query());
        const testRegularObjects = await TestObject._firstRegular({}, TestObject._query());
        if (testObjects && testRegularObjects && testRegularObjects.id != testObjects.id) {
          res.status(200).send();
        } else {
          throw new Error("Couldn't get the first object");
        }
      } catch (e) {
        res.status(404).send(e.message);
      }
    });

    app.get('/save', async (req, res) => {
      try {
        const testObject = new TestObject();
        testObject.set('prop', new Date());
        const acl = new Parse.ACL();
        acl.setPublicReadAccess(false);
        acl.setPublicWriteAccess(false);
        testObject.setACL(acl);

        const testRegularObject = new TestObject();
        const aclRegular = new Parse.ACL();
        aclRegular.setPublicReadAccess(true);
        aclRegular.setPublicWriteAccess(false);
        testRegularObject.setACL(acl);

        const testObjects = await TestObject.save(testObject);
        const testRegularObjects = await TestObject.save(testRegularObject);

        if (testObjects && testRegularObjects && testRegularObjects.id != testObjects.id) {
          res.status(200).send();
        } else {
          throw new Error("Couldn't save object");
        }
      } catch (e) {
        res.status(404).send(e.message);
      }
    });

    app.get('/saveAll', async (req, res) => {
      try {
        const object1 = new TestObject();
        object1.set('prop', new Date());
        const object2 = new TestObject();
        object2.set('prop', new Date());
        const testObjects = await TestObject.saveAll([object1, object2]);
        if (testObjects) {
          res.status(200).send();
        } else {
          throw new Error("Couldn't save all the object");
        }
      } catch (e) {
        res.status(404).send(e.message);
      }
    });

    app.get('/destroy', async (req, res) => {
      try {
        const testObject = await TestObject._first(TestObject._query());
        if (testObject) {
          await TestObject.destroy(testObject);
          res.status(200).send();
        } else {
          throw new Error("Couldn't destroy the object");
        }
      } catch (e) {
        res.status(404).send(e.message);
      }
    });

    app.get('/destroyAll', async (req, res) => {
      try {
        const testObjects = await TestObject._find(TestObject._query());
        if (testObjects) {
          await TestObject.destroyAll(testObjects);
          res.status(200).send();
        } else {
          throw new Error("Couldn't destroy all the object");
        }
      } catch (e) {
        res.status(404).send(e.message);
      }
    });

    return app.listen(1337);
  };

  return createServer();
};
