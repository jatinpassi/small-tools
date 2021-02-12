const utilities = require("./utilities")
const cheerio = require("cheerio");
const chalk = require('chalk');
const TaskQueue = require('./taskQueue');
const downloadQueue = new TaskQueue(2);

const spiderLinks = (links, directory,mainUrl) => {
  links.slice(0, 20).forEach(url => {
    downloadQueue.pushTask((done) => {
      if (url[0] == '/') {
        newUrl = new URL(mainUrl)
        url = chalk.blue(newUrl.origin + url);
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

const spider = (url, directory = __dirname) => {
    download(url, directory, (err,data,path) => {
        if (err) {
            console.log(err);
            return;
      }
      console.log(chalk.green("downloaded: " + path));

        let links = [];
        const $ = cheerio.load(data);
        $("a").each((index, element) => {
            links.push(
                $(element).attr('href')
            );
        });
        spiderLinks(links,directory,url)
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

module.exports = spider
module.exports.download = download