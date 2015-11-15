'use strict';

var test = require('./')(require('tape'));
var wait = require('co-wait');

test(function (t) {
  t.pass('this passes');
  t.end();
});

test('title', function (t) {
  t.pass('this passes');
  t.end();
});

test(function *(t) {
  yield wait(5);
  t.pass('generator passes');
});

test('title', function *(t) {
  yield wait(5);
  t.pass('generator passes');
});
