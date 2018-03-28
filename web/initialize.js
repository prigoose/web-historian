var fs = require('fs');
/* PRIYA: fs lets your node server talk to the files on your computer.
That way we can store archived versions of websites as files on our 
computer. We can also store our list of archived websites in sites.txt.
 */

// Sync is ok here because this is called just once on startup.
module.exports = function (basePath) {
  // if the archive folder doesn't exist, create it.
  if (!fs.existsSync(basePath)) {
    /*PRIYA: Sync here means synchronous. Basically, it will run this
    function until it finishes and returns a Boolean, rather than moving to
    other fxns. For this sprint, we shouldn't use Sync versions unless
    HR already set them up for us or there is no other option.
    */
    // We use fs.mkdirSync to create the folder
    fs.mkdirSync(basePath);
  }

  // if the file doesn't exist, create it.
  if (!fs.existsSync(basePath + '/sites.txt')) {
    // We use fs.openSync to create the file
    var file = fs.openSync(basePath + '/sites.txt', 'w');
    fs.closeSync(file);
  }

  // if the folder doesn't exist, create it.
  if (!fs.existsSync(basePath + '/sites')) {
    // We use fs.mkdirSync to create the folder
    fs.mkdirSync(basePath + '/sites');
  }
};


// UPON INITIALIZATION
// If no archive folder for requested site, create archive folder
// If no sites.txt file in the archive folder, create sites.txt.
// If no /sites folder exists in the archive folder, create sites folder.