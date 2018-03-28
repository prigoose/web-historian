const path = require('path');
const archive = require('../helpers/archive-helpers');
const fs = require('fs');
// require more modules/folders here!
// PRIYA: Do we have green light to use any modules that seem 
// helpful for the sprint?

exports.handleRequest = function (req, res) {
  console.log('req method: ', req.method, ', request url: ', req.url);
  // if it's a basic GET request for ip + port only --> show them index.html
  if (req.method === 'GET') {
    if (path.extname(req.url) === '.ico') { 
      res.writeHead(404);
      res.end();
    } else {
      var basename = path.basename(req.url) || 'index.html';
      fs.readFile(`./web/public/${basename}`, (err, data) => {
        if (err) { throw err; }
        var statusCode = 200;
        if (basename.includes('.html')) {
          var contentType = 'text/html';
        } else if (path.extname(req.url) === '.css') {
          var contentType = 'text/css';
        }
        res.writeHead(statusCode, {
          'Content-Type': contentType
        });
        res.end(data);
      });
    }
  } else if (req.method === 'POST') {
    fs.readFile(`./web/public/loading.html`, (err, data) => {
      if (err) { throw err; }
      res.writeHead(303, {
        'Content-Type': 'text/html'
      });
      res.end(data);
    });
  }
};
