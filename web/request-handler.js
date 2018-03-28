var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
// PRIYA: Do we have green light to use any modules that seem 
// helpful for the sprint?

exports.handleRequest = function (req, res) {
  res.end(archive.paths.list);
};
