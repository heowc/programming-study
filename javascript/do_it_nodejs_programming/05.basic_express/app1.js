// express 모듈 가져오기
const express = require('express');
// http 모듈 가져오기
const http = require('http');

// express 객체 생성
const app = express();
// 기본 포트를 app 객체의 속성으로 설정
app.set('port', process.env.PORT || 3000);

// express server 시작
http.createServer(app).listen(app.get('port'), () => {
    console.log('started express server : ' + app.get('port'));
});
