const chalk = require('chalk');
const async = require('async');
module.exports = function (links, directory, mainUrl) {
    async.concatSeries(links, (link, cb) => {
        if (link[0] === '/') {
            newUrl = new URL(mainUrl)
            link = newUrl.origin + link;
        }
        download(link, directory, (err, data, path) => {
            if (err) {
                console.log(chalk.red(`Failed to find: ${path}`));
                cb(null,path)
            }
            console.log(chalk.green("downloaded: " + path));
            cb(null,path)

        })
    
    },(err, data)=>{})
}