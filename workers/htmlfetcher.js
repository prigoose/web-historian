// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

const request = require('request');
var fs = require('fs');

exports.archiveURL = function(url) {

  fs.mkdirSync(`./archives/sites/${url}`);
  
  // request(url, (err, res, body) => {
  //   if (err) { return console.log(err); }
  //   console.log(body.url);
  //   console.log(body.explanation);
  // });
};