const fs = require('fs');
const request = require('request');


const createFile = (file) => {
    if (!fs.existsSync(file)) { 
        fs.mkdirSync(file)
    }
}

const urltoPath = (url,cb) => {
    try {
        url = new URL(url);
    } catch (err) {
        return cb(err)
    }
    if (url.port != '') return `${url.host.replace("/", "")}${url.port}/${url.pathname}/${url.search}`;
    cb(null,`${url.host.replace("/", "")}${url.pathname}/${url.searchParams.toString()}`);
}

exports.saveRequests = saveRequests = (url,filePath,cb) => {
    request.get(url, (err, res, body) => {
        if (err) {
            return cb(err)
        }
        try {
            fs.writeFileSync(filePath + "/index", body)
            cb(null,body)
        } catch(err) {
            return cb(err)
        }
    })
}

exports.resolvePath = resolvePath = (rootDir = __dirname, url,cb) => {
    urltoPath(url, (err, path) => {
        if (err) {
            return cb(err,url)
        }

        let resolvingPath = rootDir + "/" + path
        if (!fs.existsSync(resolvingPath) && path != undefined) {
            path.split("/").reduce((total, p) => {
                createFile(`${rootDir}/${total}`)
                try {
                    createFile(`${rootDir}/${total}/${p}`)
                } catch {
                    console.log("Error occur" + `${rootDir}/${total}/${p}`);
                }
                return total + "/" + p;
            })
        }
        cb(null,resolvingPath);
    })
    
}

exports.download = download = (url, directory = __dirname,cb) => {
    resolvePath(directory, url, (err, path) => {
        if (err) {

            return cb(err,null,path);
        }
        saveRequests(url, path, (err,data) => {
            if (err) {
                return cb(err)
            }
            cb(null,data,path)
        })
    })
}

