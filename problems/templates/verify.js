#!/usr/bin/env node

var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');
var filename = "01-products.mustache";

//check the directory exists
//check the file exists
//verify the contents of the file

findFile();

function findFile() {
  if (process.cwd().match("templates")) {
    check(process.cwd())
  } else {
    check(path.join(process.cwd(), "/templates/"))
  }

  function check(userspath) {
    fs.readdir(userspath, function(err, files) {
      if (err) {
        return console.log(err);
      }
      var allFiles = files.join();
      if (allFiles.match(filename)) {
        console.log("File in templates folder!");
        checkFile();
      }
      else {
        console.log("File NOT in templates folder!");
      }
    })
  }
}

function checkFile() {
  fs.readFile(path.join(process.cwd(), "/templates/" + filename), 'utf8', function (err,data) {
    if (err) {
      console.log("Try running the verify command from the top-level folder of this project.");
      return console.log(err);
    }
    else {
      if (data.indexOf('<div>') > -1) {
        console.log('There\'s wrapper divs!');
      }
      if (data.indexOf('{{> organisms-header }}') > -1) {
        console.log('Header partial found!');
      }
      if (data.indexOf('{{> organisms-product-grid }}') > -1) {
        console.log('Product grid partial exists!');
      }
      if (data.indexOf('{{> organisms-footer }}') > -1) {
        console.log('Footer partial is present!');
      }
    }
  });
}
