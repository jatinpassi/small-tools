const utilities = require("./utilities")
const cheerio = require("cheerio");
const chalk = require('chalk');


const spiderLinks = (links, directory) => {
    links.forEach(url => {
        if (url != '/') {
            download(url, directory, (err,data,path) => {
                if (err) {
                    console.log(chalk.red(`Failed to find: ${path}`));
                    return;
                }
                console.log(chalk.green("downloaded: " + path));
            })    
        }
    })
}

const spider = (url, directory = __dirname) => {
    download(url, directory, (err,data) => {
        if (err) {
            console.log(err);
            return;
        }
        let links = [];
        const $ = cheerio.load(data);
        $("a").each((index, element) => {
            links.push(
                $(element).attr('href')
            );
        });
        spiderLinks(links,directory)
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