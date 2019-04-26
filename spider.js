const request = require("request");
const mkdir = require("mkdir");
const path = require("path");
const utilities = require("./utilities");
const fs = require("fs");

function createParentDir(parentDirName) {
  mkdir.mkdirsSync(parentDirName, err => {
    if (err) {
      return;
    }
  });
}

function spider(url, callback) {
  const filename = utilities.urlToFilename(url);
  fs.exists(filename, exists => {
    if (!exists) {
      request(url, (err, response, body) => {
        if (err) {
          callback(err);
        } else {
          const parentDirName = path.resolve(__dirname, "downloads");
          const dir = fs.existsSync(parentDirName);
          if (!dir) {
            createParentDir(parentDirName);
          }

          mkdir.mkdirsSync(`${parentDirName}/${filename}`, err => {
            if (err) {
              callback(err);
            }
          });

          fs.writeFileSync(
            `${parentDirName}/${filename}/${filename}.html`,
            body,
            err => {
              if (err) {
                callback(err);
              } else {
                callback(null, filename, true);
              }
            }
          );
        }
      });
    } else {
      callback(null, filename, false);
    }
  });
}

function mycallback(err, filename, downloaded) {
  if (err) {
    console.log(err);
  } else if (downloaded) {
    console.log(`Completed the download of "${filename}"`);
  } else {
    console.log(`"${filename}" was already downloaded`);
  }
}

spider(process.argv[2], mycallback);