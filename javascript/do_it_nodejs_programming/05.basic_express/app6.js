const express = require('express');
const http = require('http');
const static = require('serve-static');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(static(path.join(__dirname, 'public')));
// app.use('/resources', static(path.join(__dirname, 'public')));

http.createServer(app).listen(app.get('port'), () => {
    console.log('started express server : ' + app.get('port'));
});
