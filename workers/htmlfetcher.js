// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

const request = require('request');
const fs = require('fs');
const archives = require('../helpers/archive-helpers');

exports.archiveURL = function(url) {
  
  // var simpleURL = url.split('/')[2];
  var newFolder = archives.paths.archivedSites + '/' + url;
  fs.mkdirSync(newFolder);
  
  // may need to process url more before requesting.
  // e.g. google.com => http://www.google.com
  request(`http://${url}`).pipe(fs.createWriteStream(`${newFolder}/index.html`));
};