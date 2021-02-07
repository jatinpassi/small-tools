const request = require('request');
const path = require('path');
const fs = require('fs');
// const url = require('url');

function spider(arguments) {
  let link = process.argv[2] || arguments;
  let diractory = __dirname + '/directory';
  if (!fs.existsSync(diractory)) {
    fs.mkdirSync(diractory);
  }
  let url = new URL(link)
  link = url.hostname;
  let path = url.pathname == '/' ? '/index' : url.pathname;
  let params = url.searchParams.toString() == '' ? '' : "/" + url.searchParams.toString();
  if (fs.existsSync(`${diractory}/${link}${path}${params}`)) {
    console.log("file Exists")
    return;
  }
  try {
    request.get(url.href, (err, res, body) => {
      if (err) {
        console.log("unable to reach " + link)
        return;
      }
      let download_dir = `${diractory}/${link}`;
      if (!fs.existsSync(download_dir)) {
        fs.mkdirSync(download_dir);
      }
      if (params != '' && !fs.existsSync(download_dir+path)) {
        fs.mkdirSync(download_dir+path);
      }
      fs.writeFileSync(`${diractory}/${link}${path}${params}`, body, (err) => {
        fs.unlinkSync(download_dir);
        console.log("unable to write")
      });
    })
  } catch {
    console.log("unable to reach " + link);
    return;
  }
}

spider("https://www.youtube.com");