const express = require('express');
const http = require('http');

const expressErrorHandler = require('express-error-handler');

const app = express();

const router = express.Router();

app.set('port', process.env.PORT || 3000);

router.route('/user/:name').get((req, res) => {
    let name = req.params.name;
    res.send({ name: name });
});

app.use("/", router);

// 모든 라우터 처리가 킅난 후, 404 오류 페이지 처리
const errorHandler = expressErrorHandler({
    static : {
        '404' : './public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

http.createServer(app).listen(app.get('port'), () => {
    console.log('started express server : ' + app.get('port'));
});
