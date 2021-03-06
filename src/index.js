import ACL from './acl';

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
        saveMasterKey(params = null) {
          return this.save(params, addMasterKey());
        },
        removeMasterKey() {
          return this.destroy(addMasterKey());
        },
        setAcl(force = false, func, ...args) {
          if (force || this.isNew()) {
            const acl = new Parse.ACL();
            ACL[func].call(acl, ...args);
            this.setACL(acl);
          }
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
    Model._findRegular = function (query, includes = [], limit = 5000, skip = 0, option = {}) {
      setIncludes(query, includes);
      query.limit(limit);
      query.skip(skip);
      return query.find(option || {});
    };

    Model._getRegular = function (query, objectId, includes = [], option = {}) {
      setIncludes(query, includes);
      return query.get(objectId, option || {});
    };

    Model._countRegular = function (query, option = {}) {
      return query.count(option || {});
    };

    Model._firstRegular = function (query, includes = [], option = {}) {
      setIncludes(query, includes);
      return query.first(option || {});
    };

    return Model;
  },
};
