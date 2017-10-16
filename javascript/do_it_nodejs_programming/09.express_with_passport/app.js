const express = require('express');
const session = require('express-session');
const http = require('http');
const bodyParser = require('body-parser');

const property = require('./config/property');
const database = require('./database/database');
const passport = require('passport');

const configPassport = require('./config/passport');
const userPassport = require('./routes/userPassport');

const app = express();
const router = express.Router();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(session({ secret: 'secret-heowc' }));
// passport 추가
app.use(passport.initialize());
// 세션에 저장 시, express-session 설정 추가
app.use(passport.session());

// 패스포트 설정
configPassport(app, passport);
// 패스포트 관련 함수 라우팅
userPassport(router, passport);

app.use('/', router);

http.createServer(app).listen(app.get('port'), () => {
    console.log('started express server : ' + app.get('port'));
    database.init(app, property);
});
