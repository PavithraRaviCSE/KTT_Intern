const fs = require('fs');

fs.readFile('sample.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log('File content:', data);
});

const streams = fs.createReadStream('sample.txt', 'utf8');
streams.on('data', chunk => {
    console.log('Chunk:', chunk);
});

fs.writeFile('output.txt', 'Hello, Node.js!', (err) => {
    if (err) throw err;
    console.log('File written successfully.');
});

const stream = fs.createWriteStream('log.txt');
stream.write('First line\n');
stream.write('Second line\n');
stream.end(() => console.log('Data written with stream.'));

fs.mkdir('newFolder', { recursive: true }, (err) => {
    if (err) throw err;
    console.log('Directory created.');
});

fs.readdir('.', (err, files) => {
    if (err) throw err;
    console.log('Files in current directory:', files);
});
