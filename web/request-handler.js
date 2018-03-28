const path = require('path');
const archive = require('../helpers/archive-helpers');
const fs = require('fs');
// require more modules/folders here!
// PRIYA: Do we have green light to use any modules that seem 
// helpful for the sprint?

exports.handleRequest = function (req, res) {
  console.log('req method: ', req.method, ', request url: ', req.url);
  // if it's a basic GET request for ip + port only --> show them index.html
  if ((! path.basename(req.url) ) && req.method === 'GET') {
    fs.readFile('./web/public/index.html', (err, data) => {
      if (err) { throw err; }
      var statusCode = 200;
      res.writeHead(statusCode, {
        'Content-Type': 'text/html' 
      });
      res.end(data);
    });
  } else if (path.basename(req.url) === 'styles.css' && req.method === 'GET') {
    fs.readFile('./web/public/styles.css', (err, data) => {
      if (err) { throw err; }
      var statusCode = 200;
      res.writeHead(statusCode, {
        'Content-Type': 'text/css' 
      });
      res.end(data);
    });
  }
};
