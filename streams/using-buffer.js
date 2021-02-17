const fs = require("fs");
const zlib = require('zlib');

module.exports = function (fileName) {
    fs.readFile(fileName, (err, buffer) => {
        zlib.gzip(buffer,(err, buffer)=> {
            fs.writeFile(fileName + '.gz', buffer, (err, buffer) => {
                console.log(`file sucessfully compressed`)
            })
        })
    })
}

// const {fileZipUsingBuffer} = require('./streams')
// fileZipUsingBuffer("E:/[ FreeCourseWeb.com ] Udemy - Creative CSS Drawing Course - Make Art With CSS - Copy")
