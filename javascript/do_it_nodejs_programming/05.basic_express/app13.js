const express = require('express');
const http = require('http');

// const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

const app = express();

const router = express.Router();

app.set('port', process.env.PORT || 3000);

// app.use(cookieParser());
app.use(expressSession({
    secret: 'node-heowc',
    // 쿠키를 임의로 변조하는것을 방지하기 위한 값이다.
    // 이 값을 통하여 세션을 암호화 하여 저장한다.
    resave: true,
    // 세션을 언제나 저장할 지 (변경되지 않아도) 정하는 값이다.
    // express-session documentation에서는 이 값을 false 로 하는것을 권장하고 필요에 따라 true로 설정합니다.

    saveUninitialized: true
    // 세션이 저장되기 전에 uninitialized 상태로 미리 만들어서 저장한다.
}));

router.route('/user/session').get((req, res) => {
    if (req.session.user) {
        res.send({ accessed : true });
    } else {
        res.send({ accessed : false });
    }
});

router.route('/user/login').post((req, res) => {
    if (req.session.user) {
        res.send({ message : '이미 로그인된 사용자 입니다.' });
    } else {
        // 세션 저장
        req.session.user = {
            id : 'heowc',
            name : '허원철',
            authorized : true
        };
        res.send({ message : '로그인 완료하였습니다.' });
    }
});

router.route('/user/logout').delete((req, res) => {
    if (req.session.user) {
        // 세션 삭제
        req.session.destroy((err) => {
            if (err) throw err;
            res.send({ message : '로그아웃 완료하였습니다.' });
        });
    } else {
        res.send({ message : '로그인하지 않은 사용자 입니다.' });
    }
});

app.use("/", router);

http.createServer(app).listen(app.get('port'), () => {
    console.log('started express server : ' + app.get('port'));
});
