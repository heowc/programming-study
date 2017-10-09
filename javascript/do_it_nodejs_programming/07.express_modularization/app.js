
// 외장 모듈
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');

// 사용자 정의 모듈
const SchemaModule = require('./modules/Schema');

const app = express();

app.set('port', process.env.PORT || 3000);

http.createServer(app).listen(app.get('port'), () => {
	console.log('started express server : ' + app.get('port'));

	createMongoose();
	createSchema();
});

const createMongoose = () => {
	mongoose.connect('mongodb://localhost/local', { useMongoClient: true });
	mongoose.Promise = global.Promise;
};

const createSchema = () => {
	let schemaModule = new SchemaModule(mongoose);
	schemaModule.create();

	// let userModel= mongoose.model('user', schemaModule.user);
};
