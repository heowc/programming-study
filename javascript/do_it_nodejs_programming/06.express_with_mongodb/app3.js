const express = require('express');
const http = require('http');

// 몽구스 모듈
const mongoose = require('mongoose');
var UserModel;

function Mongo(datasource) {
    this.datasource = datasource;

    this.connect = () => {
        console.log('connecting mongoose');

        // 데이터베이스 연결
        let connection = mongoose.createConnection(datasource.url);
        console.log('connected mongoose');

        // 스키마 정의
        let UserSchema = mongoose.Schema({
            id: String,
            name: String,
            password: String
        });
        console.log('defined schema');

        // 모델 정의
        UserModel = connection.model("users", UserSchema);
        console.log('defined model');
    };

    this.getUrl = () => {
        return datasource.url;
    };
}

const app = express();

app.set('port', process.env.PORT || 3000);

http.createServer(app).listen(app.get('port'), () => {
    console.log('started express server : ' + app.get('port'));
    let mongo = new Mongo({ url: 'mongodb://localhost/local' });
    mongo.connect();
});
