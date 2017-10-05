const express = require('express');
const http = require('http');

const app = express();

app.set('port', process.env.PORT || 3000);

// 사용자 정의 미들웨어 설정(1)
app.use((req, res, next) => {
    console.log('called first middleware');

    res.send({name: '허원철', age: 26});
    // res.status(403).send('Forbidden'); // status 메소드 호출 후, 반드시 send 메소드를 호출해야 한다.
    // res.sendStatus(403);
    // res.redirect('http://google.co.kr');
});

http.createServer(app).listen(app.get('port'), () => {
    console.log('started express server : ' + app.get('port'));
});
