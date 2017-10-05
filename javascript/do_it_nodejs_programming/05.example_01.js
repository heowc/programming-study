const http = require('http');
const server = http.createServer();
const port = 3000;

server.listen(port, () => {
    console.log('started server by node.js');
});

server.on('request', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });

    res.write('<!DOCTYPE html>');
    res.write('<html>');
    res.write('<head>');
    res.write('<title>Do it! Node.js 프로그래밍</title>');
    res.write('</head>');
    res.write('<body>');
    res.write('<h1>Node.js로 부터 응답 페이지</h1>');
    res.write('</body>');
    res.write('</html>');
    res.end();
});

/*
server.createServer((req, res) => {

});
*/
