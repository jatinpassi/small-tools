// a simple program that reads from the standard input (a Readable stream) and 
// echoes everything back to the standard output:


/* [The non-flowing mode]*/
process.stdin.on("readable", () => {
    let chunk;
    while((chunk = process.stdin.read()) !== null) {
        console.log(
        `Chunk read using Non flowing mode: (${chunk.length}) "${chunk.toString()}"`
        );
    }
}).on('end', () => process.stdout.write('End of stream of Non Flowing Mode\n'));


/* [The flowing mode]*/
process.stdin.on('data', (chunk) => {
    console.log(
        `Chunk read using flowing mode: (${chunk.length}) "${chunk.toString()}"`
    );
}).on('end', () => process.stdout.write('End of stream of Flowing Mode\n'));

//node readStdout.js | node readStdin.js