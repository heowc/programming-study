const express = require('express');
const http = require('http');
const static = require('serve-static');
const path = require('path');

const app = express();
const router = express.Router();

app.set('port', process.env.PORT || 3000);

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

app.use(static(path.join(__dirname, 'views')));

router.route('/').get((req, res) => {
    res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
    res.app.render('index', {}, (err, html) => {
        if (err) {
            // ...
            return;
        }

        res.end(html);
    });
});

app.use('/', router);

http.createServer(app).listen(app.get('port'), () => {
    console.log('started express server : ' + app.get('port'));
});
