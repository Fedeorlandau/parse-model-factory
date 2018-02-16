# Parse Model Factory

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Downloads][downloads-image]][npm-url]

# Intro
Parse Model Factory is an addon to [parse-server](https://www.npmjs.com/package/parse-server). It provides a lot of basic queries so you can centralize all of your queries in one place.
This addon is amazing when you don't want `query.find()` all over your project.
You can have clean models with just a few lines of code:

```js
const ModelFactory = require('parse-model-factory');
const MyModel = ModelFactory.generate('MyModel');
MyModel.theQueryYouHave1000times = function() {
    const query = this._query();
    // all of your logic
    return this._find(query, ['include1', 'include2'], 200);
}
module.exports = MyModel;
```

As you can see, we get the query from the model factory and we call `_find` with our complex query, an array of includes  and the limit.

No more `query.include().include().include()` :heart:

# Getting Started


## Running model factory

### Locally
```
$ npm install parse-model-factory
```

### Creating your first model


The only thing you should do is requiring the module and call the `generate` function

```js
const ModelFactory = require('parse-model-factory');

const modelProperties = {
    defaultIncludes: ['prop1', 'prop2']
};

const objectProperties = {
    toStringCustom: function() {
 	     const prop = this.get('prop');
 	     return `Your prop is ${prop}`;
    }
};

const MyModel = ModelFactory.generate('MyModel', modelProperties, objectProperties);

```

Now you should be able to do:

```js
const query = MyModel._query();
query.doesNotExist('property');

MyModel._find(query, MyModel.defaultIncludes, 10)
    .then(result => result.map(obj => console.log(obj.toStringCustom())))
    .catch(error => console.log(error));
```

## Object Methods index
* `object.customFetch()` -> Will fetch the object with the master key
* `object.saveMasterKey()` -> Will save the object with the master key
* `object.destroyMasterKey()` -> Will destroy the object with the master key
* `object.setAcl(force = false, func, ...args)`
  * force : if false will set the acl only when the object is new
  * func : method you want to set `public | private | read | write | user`

 


```js
const object = new TestObject();
object.setAcl(false, 'public', true, false);
// == setPublicReadAccess(true) && setPublicWriteAccess(false)

object.setAcl(false, 'private', [user], [user]);
// == setReadAccess(user) && setWriteAccess(user)

object.setAcl(false, 'read', user1, user2, ...);
// == setReadAccess(user1) && setReadAccess(user2) && setPublicWriteAccess(false)

object.setAcl(false, 'write', user1, user2, ...);
// == setWriteAccess(user1) && setWriteAccess(user2) && setPublicReadAccess(true)

object.setAcl(false, 'user', user);
// == setReadAccess(user) && setWriteAccess(user)

```

## Queries Methods index

* `Model._query()`


### Methods with master key
* `Model._find(query, includes = [], limit = 5000, skip = 0)`
* `Model._get(query, objectId, includes = [])`
* `Model._each(query, includes = [], callback)`
* `Model._count(query)`
* `Model._first(query, includes = [])`
* `Model.save(object, params = null)`
* `Model.saveAll(objects)`
* `Model.destroy(object)`
* `Model.destroyAll(objects)`

### Methods without master key
* `Model._findRegular(query, includes = [], limit = 5000, skip = 0, option = {})`
* `Model._getRegular(query, objectId, includes = [], option = {})`
* `Model._countRegular(query, option = {})`
* `Model._firstRegular(query, includes = [], option = {})`


```js
const query = MyModel._query();
query.doesNotExist('property');

const session = { sessionToken: req.user.getSessionToken() };

const result = await MyModel._findRegular(query, MyModel.defaultIncludes, 10, 10, session);

```

[downloads-image]: https://img.shields.io/npm/dt/parse-model-factory.svg

[npm-url]: https://www.npmjs.com/package/parse-model-factory
[npm-image]: http://img.shields.io/npm/v/parse-model-factory.svg

[travis-url]: https://travis-ci.org/Fedeorlandau/parse-model-factory
[travis-image]: https://travis-ci.org/Fedeorlandau/parse-model-factory.svg
