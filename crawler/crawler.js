const cheerio = require("cheerio");
const utilities = require("./utilities")

const spiderLinks = require('./spider-link').concatSeries;

const spider = (url, directory = __dirname) => {
    utilities.download(url, directory, (err,data,path) => {
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
        spiderLinks(links,directory,url)
    })
}

module.exports = spider
module.exports.download = utilities.download

// const crawler = require("./crawler/crawler")
// crawler(process.argv[2] || "https://www.free-css.com/free-css-templates/page263/jackpiro", "F:/youtube")
