"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var addMasterKey = function addMasterKey() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object.assign({ useMasterKey: true }, options);
};
var setIncludes = function setIncludes(query, includes) {
  includes.map(function (include) {
    return query.include(include);
  });
};

exports.default = {
  generate: function generate(modelName) {
    var modelProperties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var objectProperties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var Model = Object.assign(Parse.Object.extend(modelName, Object.assign(objectProperties, {
      customFetch: function customFetch() {
        return this.fetch(addMasterKey());
      }
    })), modelProperties);

    Model._query = function () {
      return new Parse.Query(this);
    };

    Model._find = function (query) {
      var includes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5000;
      var skip = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

      setIncludes(query, includes);
      query.limit(limit);
      query.skip(skip);
      return query.find(addMasterKey());
    };

    Model._get = function (query, objectId) {
      var includes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

      setIncludes(query, includes);
      return query.get(objectId, addMasterKey());
    };

    Model._each = function (query) {
      var includes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var callback = arguments[2];

      setIncludes(query, includes);
      return query.each(callback, addMasterKey());
    };

    Model._count = function (query) {
      return query.count(addMasterKey());
    };

    Model._first = function (query) {
      var includes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      setIncludes(query, includes);
      return query.first(addMasterKey());
    };

    Model.save = function (object) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

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
    Model._findRegular = function (query) {
      var includes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5000;
      var skip = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var option = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

      setIncludes(query, includes);
      query.limit(limit);
      query.skip(skip);
      return query.find(option || {});
    };

    Model._getRegular = function (query, objectId) {
      var includes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var option = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      setIncludes(query, includes);
      return query.get(objectId, option || {});
    };

    Model._countRegular = function (query) {
      var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return query.count(option || {});
    };

    Model._firstRegular = function (query) {
      var includes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      setIncludes(query, includes);
      return query.first(option || {});
    };

    return Model;
  }
};
module.exports = exports["default"];