"use strict";

var ACL = {};

// object.setAcl(false, 'public', true, false);
// object.setAcl(false, 'private', [user], [user]);
// object.setAcl(false, 'read', user);
// object.setAcl(false, 'write', user);
// object.setAcl(false, 'user', user);

ACL.setReadAccess = function () {
  var _this = this;

  var reads = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  Array.from(reads).forEach(function (user) {
    if (user) {
      _this.setReadAccess(user, true);
    }
  });
};

ACL.setWriteAccess = function () {
  var _this2 = this;

  var writes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  Array.from(writes).forEach(function (user) {
    if (user) {
      _this2.setWriteAccess(user, true);
    }
  });
};

ACL.public = function () {
  var read = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var write = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  this.setPublicReadAccess(read);
  this.setPublicWriteAccess(write);
};

ACL.private = function () {
  var reads = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var writes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  ACL.setReadAccess.call(this, reads);
  ACL.setWriteAccess.call(this, writes);
};

ACL.read = function () {
  for (var _len = arguments.length, reads = Array(_len), _key = 0; _key < _len; _key++) {
    reads[_key] = arguments[_key];
  }

  ACL.setReadAccess.call(this, reads);
  this.setPublicWriteAccess(false);
};

ACL.write = function () {
  console.log();

  for (var _len2 = arguments.length, writes = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    writes[_key2] = arguments[_key2];
  }

  ACL.setWriteAccess.call(this, writes);
  this.setPublicReadAccess(true);
};

ACL.user = function (user) {
  console.log(user);
  ACL.private.call(this, [user], [user]);
};

module.exports = ACL;