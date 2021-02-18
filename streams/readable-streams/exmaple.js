const Stream = require('stream')
const readableStream = new Stream.Readable({
    read(size=1){}
})
readableStream.push('ping!')
readableStream.push('pong!')

readableStream.on("data", (chunk) => {
    console.log("chunk",chunk.toString())
})