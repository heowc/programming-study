const mongoose = require('mongoose');

// Database 클래스 정의
class Database {

	// 생성자
	constructor() {
		this.schemas = {};
	}

	init(app, property) {
		this.app = app;
		this.property = property;

		this.connect();
		this.createSchema();
	}

	// 데이터베이스 연결
	connect() {
		mongoose.connect(this.property.datasource.url, this.property.datasource.option);
		mongoose.Promise = global.Promise;
	}

	// 스키마 생성
	createSchema() {
		this.property.mongodb
		.schemas.forEach((schemaProperty) => {
			let schema = require(schemaProperty.file).create(mongoose);
			let model = mongoose.model(schemaProperty.collection, schema);

			this.schemas[schemaProperty.schemaName] = schema;
			this.schemas[schemaProperty.modelName] = model;
		});

		// app 객체에 추가
		this.app.set('schemas', this.schemas);
	}
}

module.exports = new Database();