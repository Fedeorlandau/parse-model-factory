const addMasterKey = (options = {}) => Object.assign({ useMasterKey: true }, options);
const setIncludes = (query, includes) => {
  includes.map(include => query.include(include));
};

export default {
  generate: (modelName, modelProperties = {}, objectProperties = {}) => {
    const Model = Object.assign(Parse.Object.extend(modelName, Object.assign(objectProperties,
      {
        customFetch() {
          return this.fetch(addMasterKey());
        },
      })), modelProperties);

    Model._query = function () {
      return new Parse.Query(this);
    };

    Model._find = function (query, includes = [], limit = 5000, skip = 0) {
      setIncludes(query, includes);
      query.limit(limit);
      query.skip(skip);
      return query.find(addMasterKey());
    };

    Model._get = function (query, objectId, includes = []) {
      setIncludes(query, includes);
      return query.get(objectId, addMasterKey());
    };

    Model._each = function (query, includes = [], callback) {
      setIncludes(query, includes);
      return query.each(callback, addMasterKey());
    };

    Model._count = function (query) {
      return query.count(addMasterKey());
    };

    Model._first = function (query, includes = []) {
      setIncludes(query, includes);
      return query.first(addMasterKey());
    };

    Model.save = function (object, params = null) {
      return object.save(params, addMasterKey());
    };

    Model.saveAll = function (objects) {
      return Parse.Object.saveAll(objects, addMasterKey());
    };

    Model.destroy = function (object) {
      return object.destroy(addMasterKey());
    };

    Model.destroyAll = function (objects) {
      return Parse.Object.destroyAll(objects, addMasterKey());
    };

    // No Master Key
    // - working with session token
    // - const option = { sessionToken: req.user.getSessionToken() };
    Model._findRegular = function (option, query, includes = [], limit = 5000, skip = 0) {
      setIncludes(query, includes);
      query.limit(limit);
      query.skip(skip);
      return query.find(option || {});
    };

    Model._getRegular = function (option, query, objectId, includes = []) {
      setIncludes(query, includes);
      return query.get(objectId, option || {});
    };

    Model._countRegular = function (option, query) {
      return query.count(option || {});
    };

    Model._firstRegular = function (option, query, includes = []) {
      setIncludes(query, includes);
      return query.first(option || {});
    };

    return Model;
  },
};
