const { argv } = require("process")
const crawler = require("./crawler/crawler")
crawler(argv[2] || "https://www.youtube.com/watch?v=kb-W7Rx1e-0&list=RDCMUC4EcI-Eijs22u1Qpragri9Q&start_radio=1","F:/youtube")