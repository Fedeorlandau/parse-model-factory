const _ = require('underscore');
const Parse = require('parse/node');

const addMasterKey = (options = {}) =>  _.extend({useMasterKey: true}, options);    

module.exports = {
  generate: (modelName, modelProperties = {}, objectProperties = {}) => {
    const Model = _.extend(Parse.Object.extend(modelName, _.extend(objectProperties,
      {
        customFetch: function() {
          return this.fetch(addMasterKey())
        }
      })), modelProperties);

    Model._query = function() {
      return new Parse.Query(this);
    };

    Model._find = function(query, includes, limit = 5000) {
      query.include(includes);
      query.limit(limit);
      return query.find(addMasterKey());
    };

    Model._get = function (query, objectId, includes) {
      query.include(includes);
      return query.get(objectId, addMasterKey());
    };

    Model._each = function(query, includes, callback) {
      query.include(includes);
      return query.each(callback, addMasterKey());
    };

    Model._count = function(query) {
      return query.count(addMasterKey());
    };

    Model._first = function(query, includes){
      query.include(includes);
      return query.first(addMasterKey());
    };

    Model.save = function(object, params = null) {
      return object.save(params, addMasterKey());
    };

    Model.saveAll = function(objects) {
      return Parse.Object.saveAll(objects, addMasterKey())
    };

    Model.destroy = function(object) {
      return object.destroy(addMasterKey());
    };

    Model.destroyAll = function(objects) {
      return Parse.Object.destroyAll(objects, addMasterKey());
    };

    return Model;
  }
};
