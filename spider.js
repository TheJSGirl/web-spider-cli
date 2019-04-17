const request = require('request');
const mkdir = require('mkdir');
const path = require('path');
const utilities = require('./utilities');
const fs = require('fs');

async function spider(url, callback) {
    const filename = utilities.urlToFilename(url);
    console.log(filename)
    fs.exists(filename, exists => {
        if(!exists) {
            request(url, async(err, response, body) => {
                if(err) {
                    console.log("helloo")
                    callback(err)
                }
                else {
                   const dirName = `${path.resolve(__dirname)}/${filename}`;                    
                   await  mkdir.mkdirsSync(dirName, err => {
                        // if(err) {
                        //     console.log("error")
                        //     callback(err)
                        // }
                        fs.writeFileSync(`${path.resolve(__dirname)}/${filename}.html`, body, err => {
                                if(err) {
                                    callback(err)
                                }else {
                                    callback(null, filename, true);
                                }
                            })
                        
                    })
                }
            });
        } else {
            callback(null, filename, false);
        }
    })
}

function mycallback (err, filename, downloaded) {
    if(err) {
    console.log(err);
    } else if(downloaded){
    console.log(`Completed the download of "${filename}"`);
    } else {
    console.log(`"${filename}" was already downloaded`);
    }
    }

spider(process.argv[2], mycallback);