const express = require('express');
const http = require('http');

const app = express();

const router = express.Router();

app.set('port', process.env.PORT || 3000);

// 라우터 함수 등록
router.route('/user/:name').get((req, res) => {
    let name = req.params.name;
    res.send({ name: name });
});

app.use("/", router);

http.createServer(app).listen(app.get('port'), () => {
    console.log('started express server : ' + app.get('port'));
});
