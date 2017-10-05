const http = require('http');
const fs = require('fs');

const server = http.createServer();
const port = 3000;

server.listen(port, () => {
    console.log('started server by node.js');
});

/*
server.on('request', (req, res) => {
    let filename = 'node.png';
    fs.readFile(filename, (err, data) => {
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.write(data);
        res.end();
    });
});
*/
server.on('request', (req, res) => {
    let filename = 'node.png';
    let infileStream = fs.createReadStream(filename, { 'flag': 'r' });
    infileStream.pipe(res);
});
