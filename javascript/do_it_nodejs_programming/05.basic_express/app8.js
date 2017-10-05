const express = require('express');
const http = require('http');

const bodyParser = require('body-parser');

const app = express();
// 라우터 객체 참조
const router = express.Router();

app.set('port', process.env.PORT || 3000);

// application/json 파싱
app.use(bodyParser.json());

// 라우터 함수 등록
router.route('/user').get((req, res) => {
    console.log('get');
    res.end();
});

router.route('/user').post((req, res) => {
    console.log('post');
    res.end();
});

// 라우터 객체를 app 객체에 등록
app.use("/", router);

http.createServer(app).listen(app.get('port'), () => {
    console.log('started express server : ' + app.get('port'));
});
