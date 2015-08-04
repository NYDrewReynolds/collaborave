
var qs = require('query-string');
var corslite = require('corslite');
var jsonp = require('browser-jsonp');


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

  corslite(url, function(err, res) {
    try {
      if (err) throw err;
      if (!err) {
        res = JSON.parse(res.response) || res;
        callback(err, res);
      }
    } catch(e) {
      jsonp({
        url: url,
        error: function(err) {
          callback(err);
        },
        success: function(res) {
          callback(null, res);
        }
      });
    }
  }, true);

};

