const ACL = {};

// object.setAcl(false, 'public', true, false);
// object.setAcl(false, 'private', [user], [user]);
// object.setAcl(false, 'read', user);
// object.setAcl(false, 'write', user);
// object.setAcl(false, 'user', user);

ACL.setReadAccess = function (reads = []) {
  Array.from(reads).forEach((user) => {
    if (user) {
      this.setReadAccess(user, true);
    }
  });
};

ACL.setWriteAccess = function (writes = []) {
  Array.from(writes).forEach((user) => {
    if (user) {
      this.setWriteAccess(user, true);
    }
  });
};

ACL.public = function (read = false, write = false) {
  this.setPublicReadAccess(read);
  this.setPublicWriteAccess(write);
};

ACL.private = function (reads = [], writes = []) {
  ACL.setReadAccess.call(this, reads);
  ACL.setWriteAccess.call(this, writes);
};

ACL.read = function (...reads) {
  ACL.setReadAccess.call(this, reads);
  this.setPublicWriteAccess(false);
};

ACL.write = function (...writes) {
  ACL.setWriteAccess.call(this, writes);
  this.setPublicReadAccess(true);
};

ACL.user = function (user) {
  console.log(user);
  ACL.private.call(this, [user], [user]);
};

module.exports = ACL;
