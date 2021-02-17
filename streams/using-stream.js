const fs = require("fs");
const zlib = require("zlib");

module.exports = function (fileName) {
    fs.createReadStream(fileName)
        .pipe(zlib.createGzip())
        .pipe(fs.createWriteStream(fileName+".gz"))
        .on("finish", ()=>console.log("File successfully compressed"))
}


// const { fileZipUsingStream } = require("./streams");
// fileZipUsingStream("E:/The Shawshank Redemption 1994 x264 720p Esub BluRay Dual Audio English Hindi GOPISAHI.mkv")
