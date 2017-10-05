const express = require('express');
const http = require('http');

const app = express();

app.set('port', process.env.PORT || 3000);

// 사용자 정의 미들웨어 설정(1)
app.use((req, res, next) => {
    console.log('called first middleware');

    let userAgent = req.header('User-Agent');
    let paramName = req.query.name;

    res.writeHead('200', { 'Content-Type' : 'text/html; charset=utf-8' });
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    res.write(`<div><p>User-Agent : ${userAgent}</p></div>`);
    res.write(`<div><p>Param name : ${paramName}</p></div>`);
    res.end();
});

http.createServer(app).listen(app.get('port'), () => {
    console.log('started express server : ' + app.get('port'));
});
