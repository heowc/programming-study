// 외장 모듈
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

// 사용자 정의 모듈
const property = require('./config/property');
const database = require('./database/database');
const routeLoader = require('./routes/routeLoader');

const app = express();
const router = express.Router();

app.set('port', process.env.PORT || property.port);

app.use(bodyParser.json());

http.createServer(app).listen(app.get('port'), () => {
	console.log('started express server : ' + app.get('port'));

	database.init(app, property);
	routeLoader.init(app, router, property);
});


