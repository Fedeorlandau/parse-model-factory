# Stop!

Parse Model Factory helps you to compact your parse's models. **All the queries are using useMasterKey in true.**

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
    toStringCustom: () => {
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
    .then(result => result.map(obj => obj.toStringCustom())
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
