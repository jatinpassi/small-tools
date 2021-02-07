require('./crawler/crawler')
function spiderLinks(currentUrl, body, nesting, callback) {
    if(nesting === 0) {
    return process.nextTick(callback);
    }
    const links = utilities.getPageLinks(currentUrl, body); //[1]
    function iterate(index) { //[2]
    if(index === links.length) {
    return callback();
    }
    spider(links[index], nesting - 1, err => { //[3]
    if(err) {
        return callback(err);
    }
    iterate(index + 1);
    });
    }
    iterate(0); //[4]
   }
   