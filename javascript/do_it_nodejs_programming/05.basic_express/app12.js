const express = require('express');
const http = require('http');

const cookieParser = require('cookie-parser');

const app = express();

const router = express.Router();

app.set('port', process.env.PORT || 3000);

app.use(cookieParser());

router.route('/user/cookie').get((req, res) => {
    res.send(req.cookies);
    // res.send(req.cookies.user);
});

router.route('/user/cookie').post((req, res) => {
    // 쿠키 설정
    res.cookie('user', {
        id : 'heowc',
        name : '허원철',
        authorized : true
    });

    res.send({ saved : true });
});

app.use("/", router);

http.createServer(app).listen(app.get('port'), () => {
    console.log('started express server : ' + app.get('port'));
});
