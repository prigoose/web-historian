var http = require('http');
var handler = require('./request-handler');
var initialize = require('./initialize.js');
var archivehelpers = require('../helpers/archive-helpers.js');
//var htmlfetcher = require('../workers/htmlfetcher.js') // For testing

// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
/* PRIYA: we never upload ./archives to git because ???.
So instead we initialize our necessary folder structure 
(archive / sites, sites.txt)*/ 
initialize('./archives');
//htmlfetcher.archiveURL('http://www.facebook.com'); // For testing
//archivehelpers.downloadUrls(['http://www.facebook.com', 'http://www.reddit.com']);

var port = 8080;
var ip = '127.0.0.1';
var server = http.createServer(handler.handleRequest);

if (module.parent) {
  //PRIYA: "The "parent" is the module that caused the script to be interpreted (and cached)" (?)
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log('Listening on http://' + ip + ':' + port);
}

