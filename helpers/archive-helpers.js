var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var htmlfetcher = require('../workers/htmlfetcher.js');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

var urls;

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  // read list of URLs in our current hard drive / sites storage place
  fs.readFile(exports.paths.list, 'utf8', (err, data) => {
    if (err) { throw err; }
    urls = data.split('\n');
    callback(urls);  
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls((urls) => callback(urls.includes(url), url));
  //Take a callback that wants a Boolean
  //Specifically: 
  // If not in list, add the URL
  // If in list, call isUrlArchived with the callback:
  //  If archived, post it to user
  //  If not archived, tell the user to hang on
};

exports.addUrlToList = function(url, callback) {
  fs.writeFile(exports.paths.list, `${url}\n`, (err) => {
    if (err) { throw err; }
    console.log(`${url} has been added to ${exports.paths.list}, yeet`);
    callback(); // Think about why this is here
    // Sam G. says that Danny says that the tests may just be dysfunctional
  });
};

exports.isUrlArchived = function(url, callback) {
  console.log(exports.paths.archivedSites + '/' + url);
  fs.access(exports.paths.archivedSites + '/' + url, fs.constants.F_OK, (err) => {
    callback(!err ? true : false, url);
  });
};

exports.downloadUrls = function(urls) {
  // If we haven't archived URL, let's download and add it to our archive
  urls.forEach((url) =>
    exports.isUrlArchived(url, function(isArchived, url) {
      if (!isArchived) {
        htmlfetcher.archiveURL(url);
      }
    })
  );
};

