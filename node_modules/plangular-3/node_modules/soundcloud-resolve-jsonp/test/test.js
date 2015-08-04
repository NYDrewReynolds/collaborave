
var assert = require('assert');
var resolve = require('../node');
var client_id = require('../config.json').client_id;

var testTrack = 'http://soundcloud.com/jxnblk/let-go';
var result;


describe('soundcloud-resolve-jsonp', function() {

  it('should be a function', function() {
    assert.equal(typeof resolve, 'function');
  });

  it('should not throw', function(done) {
    assert.doesNotThrow(function() {
      resolve({ url: testTrack, client_id: client_id }, function(err, res) {
        if (err) throw err;
        result = res;
        done();
      });
    });
  });

  it('should return a title', function() {
    assert(result.title);
  });

  it('should return a user', function() {
    assert(result.user);
  });

  it('should return a stream_url', function() {
    assert(result.stream_url);
  });

  it('should support options object', function(done) {
    assert.doesNotThrow(function() {
      resolve({ url: testTrack, client_id: client_id }, { superagent: true }, function(err, res) {
        if (err) throw err;
        done();
      });
    });
  });

  it('should support /user/likes', function(done) {
    var url = 'http://soundcloud.com/jxnblk/likes';
    assert.doesNotThrow(function() {
      resolve({ url: url, client_id: client_id }, function(err, res) {
        if (err) throw err;
        done();
      });
    });
  });

});
