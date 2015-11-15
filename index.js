'use strict';

var isGenerator = require('is-generator').fn;
var co = require('co');

module.exports = function (tape) {
  return function test (name, cb) {
    if (typeof name === 'function') {
      cb = name;
      if (isGenerator(cb)) {
        tape(wrapGenerator(cb));
      } else {
        tape(cb);
      }
      return;
    }

    if (isGenerator(cb)) {
      tape(name, wrapGenerator(cb));
    } else {
      tape(name, cb);
    }
  };
};

function wrapGenerator (cb) {
  return function (t) {
    var fn = co.wrap(cb);
    fn(t).then(t.end.bind(t), t.end.bind(t));
  };
}
