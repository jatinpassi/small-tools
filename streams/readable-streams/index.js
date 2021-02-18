const RandomStream = require('./randomStream');
const randomStream = new RandomStream();
randomStream.readableObjectMode = true
randomStream.setEncoding("utf8")
randomStream.pipe(process.stdout)
