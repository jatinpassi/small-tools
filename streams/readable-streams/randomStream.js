const stream = require('stream')
const Chance = require('chance')
const chance = new Chance()

module.exports = class RandomStream extends stream.Readable{
    constructor(option) {
        super(option)
    }
    _read(size) {
        const chunk = chance.paragraph();
        this.push(chunk.toString());
        if (chance.bool({ likelihood: 5 })) {
            this.push(null)
        }
    }
}

// [index.js]
// const RandomStream = require('./randomStream');
// const randomStream = new RandomStream();
// randomStream.on('readable', () => {
//  let chunk;
//  while((chunk = randomStream.read()) !== null) {
//  console.log(`Chunk received: ${chunk.toString()}`);
//  }
// });



// [index.js]
// const RandomStream = require('./randomStream');
// const randomStream = new RandomStream();
// randomStream.readableObjectMode = true
// randomStream.setEncoding("utf8")
// randomStream.pipe(process.stdout)