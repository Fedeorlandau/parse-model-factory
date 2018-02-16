'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _acl = require('./acl');

var _acl2 = _interopRequireDefault(_acl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
      },
      saveMasterKey: function saveMasterKey() {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        return this.save(params, addMasterKey());
      },
      removeMasterKey: function removeMasterKey() {
        return this.destroy(addMasterKey());
      },
      setAcl: function setAcl() {
        var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var func = arguments[1];

        if (force || this.isNew()) {
          var _ACL$func;

          var acl = new Parse.ACL();

          for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            args[_key - 2] = arguments[_key];
          }

          (_ACL$func = _acl2.default[func]).call.apply(_ACL$func, [acl].concat(_toConsumableArray(args)));
          this.setACL(acl);
        }
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
module.exports = exports['default'];