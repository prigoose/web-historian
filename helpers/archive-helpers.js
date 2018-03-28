var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

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
		// "should read urls from sites.txt"
	// what's with the callback? Do we do something to our list within this fxn?
};

exports.isUrlInList = function(url, callback) {
	// is URL in our list?
		// i.e. is URL in our array in sites.txt
	// what's with the callback? Do we do something to our list within this fxn?
};

exports.addUrlToList = function(url, callback) {
	// if isURLInList === false, then add it to our list
	// perhaps we can use the callback to add url to the list in a certain way?
	// like filter it first?
};

exports.isUrlArchived = function(url, callback) {
	// check if we've already archived URL
	// what's with the callback? Do we do something to our list within this fxn?
	// callback: if false --> run downloadUrls ?
};

exports.downloadUrls = function(urls) {
	// If we haven't archived URL, let's download and add it to our archive
};
