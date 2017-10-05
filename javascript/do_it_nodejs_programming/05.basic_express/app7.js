const express = require('express');
const http = require('http');

const bodyParser = require('body-parser');

const app = express();

app.set('port', process.env.PORT || 3000);

// application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }));
// application/json 파싱
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log('called first middleware');

    let id = req.body.id || req.query.id;
    let password = req.body.password || req.query.password;

    res.writeHead('200', { 'Content-Type' : 'text/html; charset=utf-8' });
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    res.write(`<div><p>Param id : ${id}</p></div>`);
    res.write(`<div><p>Param password : ${password}</p></div>`);
    res.end();
});

http.createServer(app).listen(app.get('port'), () => {
    console.log('started express server : ' + app.get('port'));
});
