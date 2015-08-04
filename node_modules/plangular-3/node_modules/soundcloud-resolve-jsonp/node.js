// Node compatible version

var qs = require('query-string');
var request = require('superagent');

var endpoint = 'https://api.soundcloud.com/resolve.json';

module.exports = function(params) {

  var params = params || {};
  var options;
  var callback;

  if (typeof arguments[1] === 'object') {
    options = arguments[1];
    callback = arguments[2];
  } else {
    options = {};
    callback = arguments[1];
  }

  var url = endpoint + '?' + qs.stringify(params);

  request.get(url).end(function(err, res) {
    callback(err, res.body);
  });

};

