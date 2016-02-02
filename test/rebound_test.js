'use strict';

var grunt = require('grunt');

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

exports.rebound = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  plaintext: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/plaintext.js').trim();
    var expected = grunt.file.read('test/expected/plaintext').trim();
    test.equal(actual, expected, 'should render a text template');

    test.done();
  },
  dom: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/dom.js').trim();
    var expected = grunt.file.read('test/expected/dom').trim();
    test.equal(actual, expected, 'should render a template containing dom and mustaches');

    test.done();
  },
  userCard: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/user-card.js').trim();
    var expected = grunt.file.read('test/expected/user-card').trim();
    test.equal(actual, expected, 'should render a web component template with two partials');

    test.done();
  },
};
