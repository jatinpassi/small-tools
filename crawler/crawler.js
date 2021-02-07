const request = require('request');
const fs = require('fs');


function saveFile(path, data, cb) {
  if (!!fs.existsSync(path)) {
    
    fs.unlinkSync(path);
  }
  fs.writeFileSync(path, data, (err) => {
    if (err) {
      fs.unlinkSync(path);
      return cb(err);
    }
    cb(null,"done")
  });
}

function resolveUrl(url) {
  url = new URL(url)
  let link = url.hostname;
  let path = url.pathname == '/' ? '/index' : url.pathname;
  let params = url.searchParams.toString() == '' ? '' : "/" + url.searchParams.toString();
  return [ link, path, params, url.href ];
}

function download(url,cb) {
  request.get(url, (err, res, body) => { 
    if (err) return cb(err);
    cb(null,body)
  })
}

function spider(arguments,cb) {
  let diractory = __dirname + '/directory';
  if (!fs.existsSync(diractory)) {
    fs.mkdirSync(diractory);
  }
  let [link, path, params, href] = resolveUrl(process.argv[2] || arguments);
  // if (fs.existsSync(`${diractory}/${link}${path}${params}`)) {
  //   return cb(new Error("file already exists"))
  // }
  try {
    download(href, (err, data) => {
      if (err) {
        return cb(err)
      }
      let download_dir = `${diractory}/${link}`;
      if (!fs.existsSync(download_dir)) {
        fs.mkdirSync(download_dir);
      }
      if (params != '' && !fs.existsSync(download_dir+path)) {
        fs.mkdirSync(download_dir+path);
      }
      saveFile(`${diractory}/${link}${path}${params}`, data, (err, data) => {
        if (err) return cb(err);
        cb(data)
      })
    })
  } catch(err) {
    return cb(err)
  }
}

spider("https://www.youtube.com", (err) => {
  console.log(err)
});
