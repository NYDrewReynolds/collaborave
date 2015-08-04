# soundcloud-resolve-jsonp

Use the SoundCloud API resolve endpoint with corslite and a JSONP fallback for Safari

## Getting Started

```bash
npm install soundcloud-resolve-jsonp
```

```js
var resolve = require('soundcloud-resolve-jsonp');
var track;

resolve({
  url: 'http://soundcloud.com/jxnblk/let-go',
  client_id: CLIENT_ID
  }, function(err, res) {
    if (err) { console.error(err) }
    track = res;
});
```

## Node environments

For use within node, use the `node.js` version, which uses superagent.

```js
var resolve = require('soundcloud-resolve-jsonp/node');
```


---

MIT License

