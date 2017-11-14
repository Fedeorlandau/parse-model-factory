[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Downloads][downloads-image]][npm-url]

# Stop!

Parse Model Factory helps you to compact your parse models. **All the queries are using useMasterKey in true.**

# Getting Started


## Running model factory

### Locally
```
$ npm install parse-model-factory
```

### Creating your first model


The only thing you should do is requiring the module and call the `generate` function

```
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

```
const query = MyModel._query();
query.doesNotExist('property');

MyModel._find(query, MyModel.defaultIncludes, 10)
    .then(result => result.map(obj => console.log(obj.toStringCustom())))
    .catch(error => console.log(error));
```

## Methods index

* `_query()`
* `_find(query, includes, limit = 5000)`
* `_get(query, objectId, includes`
* `_each(query, includes, callback)`
* `_count(query)`
* `_first(query, includes)`
* `save(object, params = null)`
* `saveAll(objects)`
* `destroy(object)`
* `destroyAll(objects)`

[downloads-image]: http://img.shields.io/npm/dm/validator.svg

[npm-url]: https://npmjs.org/package/validator
[npm-image]: http://img.shields.io/npm/v/validator.svg

[travis-url]: https://travis-ci.org/chriso/validator.js
[travis-image]: http://img.shields.io/travis/chriso/validator.js.svg
