// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

const request = require('request');
var fs = require('fs');

exports.archiveURL = function(url) {
  
  var simpleURL = url.split('/')[2];
  var newFolder = `./archives/sites/${simpleURL}`;
  fs.mkdirSync(newFolder);
  
  // may need to process url more before requesting.
  // e.g. google.com => http://www.google.com
  request(url).pipe(fs.createWriteStream(`${newFolder}/index.html`));
};