const { argv } = require("process")
const crawler = require("./crawler/crawler")
crawler(argv[2] || "https://www.free-css.com/free-css-templates/page263/jackpiro", "F:/youtube")
