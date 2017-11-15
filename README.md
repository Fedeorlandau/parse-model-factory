# Parse Model Factory

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Downloads][downloads-image]][npm-url]

# Intro
Parse Model Factory is an addon for [parse-server](https://www.npmjs.com/package/parse-server). It provides a lot of basic queries so you can centralize all of your queries in one place. 
This addon is amazing when you don't want `query.find()` all over your project.
You can have clean models with just a few lines of code:

```
const ModelFactory = require('parse-model-factory');
const MyModel = ModelFactory.generate('MyModel');
MyModel.theQuerieYouHave1000times = function() {
    const query = this._query();
    // all of your logic
    return this._find(query, ['include1', 'include2'], 200);
}
module.exports = MyModel;
```

As you can see, we get the query from the model factory and we call `_find` with our complex query, an array of includes  and the limit.

No more `query.include().include().include()` :heart:

# Stop!

 **All the queries are using useMasterKey in true.**

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
* `_find(query, includes = [], limit = 5000)`
* `_get(query, objectId, includes = [])`
* `_each(query, includes = [], callback)`
* `_count(query)`
* `_first(query, includes = [])`
* `save(object, params = null)`
* `saveAll(objects)`
* `destroy(object)`
* `destroyAll(objects)`

[downloads-image]: https://img.shields.io/npm/dt/parse-model-factory.svg

[npm-url]: https://www.npmjs.com/package/parse-model-factory
[npm-image]: http://img.shields.io/npm/v/parse-model-factory.svg

[travis-url]: https://travis-ci.org/Fedeorlandau/parse-model-factory
[travis-image]: https://travis-ci.org/Fedeorlandau/parse-model-factory.svg

