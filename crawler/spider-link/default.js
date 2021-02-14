const TaskQueue = require('../taskQueue');
const downloadQueue = new TaskQueue(2);
const chalk = require('chalk');
const utilities = require("../utilities")

module.exports = function (links, directory, mainUrl) {
    links.slice(0, 20).forEach(url => {
        downloadQueue.pushTask((done) => {
            if (url[0] == '/') {
                newUrl = new URL(mainUrl)
                url = newUrl.origin + url;
            }
            if (url != '/') {
                download(url, directory, (err, data, path) => {
                    if (err) {
                        console.log(chalk.red(`Failed to find: ${path}`));
                        return done();
                    }
                    console.log(chalk.green("downloaded: " + path));
                    done();
                })
            }
        })
    })
}

const download = (url, directory = __dirname,cb) => {
    utilities.resolvePath(directory, url, (err, path) => {
        if (err) {

            return cb(err,null,path);
        }
        utilities.saveRequests(url, path, (err,data) => {
            if (err) {
                return cb(err)
            }
            cb(null,data,path)
        })
    })
}