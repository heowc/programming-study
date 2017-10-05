const express = require('express');
const http = require('http');

const app = express();

const router = express.Router();

app.set('port', process.env.PORT || 3000);

router.route('/user/:name').get((req, res) => {
    let name = req.params.name;
    res.send({ name: name });
});

app.use("/", router);

// 등록되지 않은 패스에 대해 페이지 오류 응답
app.all('*', (req, res) => {
    res.status(404).send('<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>');
});

http.createServer(app).listen(app.get('port'), () => {
    console.log('started express server : ' + app.get('port'));
});
