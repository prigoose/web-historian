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
    if (path.extname(req.url) === '.html' || path.extname(req.url) === '.css' || req.url === '/') { 
      var basename = path.basename(req.url) || 'index.html';
      fs.readFile(`${__dirname}/public/${basename}`, (err, data) => {
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
    } else {
      res.writeHead(404);
      res.end();
    }
  } else if (req.method === 'POST') {
    var submittedUrl = '';
    req.on('data', (chunk) => { 
      submittedUrl += chunk; 
    });
    req.on('end', () => {
      var splitURL = submittedUrl.split('=');
      var simpleURL = splitURL[splitURL.length - 1];
      var respondToListStatus = (isInList, url) => {
        if (!isInList) {
          archive.addUrlToList(url, function() {});
        }
      };
      var respondToArchiveStatus = (isArchived, url) => {
        if (isArchived) {
          fs.readFile(path.join(__dirname, '../archives/sites', url), (err, data) => {
            if (err) { throw err; }
            res.writeHead(200, {
              'Content-Type': 'text/html'
            });
            res.end(data);
          });         
        } else {
          archive.isUrlInList(simpleURL, respondToListStatus);
          res.writeHead(302, {
            'Location': '/loading.html'
          });
          res.end();
        }
      };
      archive.isUrlArchived(simpleURL, respondToArchiveStatus);
    });
  }
};
