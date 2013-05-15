'use strict';

var grunt = require('grunt');
var cortex_install = require('../lib/cortex-install');
/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.cortex_install = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  all: function(test) {

    test.expect(1);
    test.equal(1,1,"yeah");
    test.done();
  }
};
