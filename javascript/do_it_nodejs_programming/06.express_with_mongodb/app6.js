const express = require('express');
const http = require('http');

const mongoose = require('mongoose');
var NameModel;
var NameSchema;

function Mongo(datasource) {
    this.datasource = datasource;

    this.connect = () => {
        console.log('connecting mongoose');

        let connection = mongoose.createConnection(datasource.url);
        console.log('connected mongoose');

        NameSchema = mongoose.Schema({
            first_name: String,
            last_name: String
        });

        NameSchema
            .virtual('fullName')
            .set((fullName) => {
                let array = fullName.split(' ');
                this.first_name = array[1];
                this.last_name = array[0];
                console.log('setting virtual fullName : %s, %s', this.last_name, this.first_name);
            })
            .get(() => {
                return this.last_name + ' ' + this.first_name;
            });
        console.log('defined schema');

        NameModel = connection.model("name", NameSchema);
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

    doTest();
});

const doTest = () => {
    let fullName = 'wonchul heo';

    let name = new NameModel({
	    last_name: 'heo',
	    first_name: 'wonchul'
    });

    // console.log(name.fullName);

    addName(fullName);
	findAll((err, results) => {
        if (err) throw err;

        console.log(results);
    });
}

// 사용자 조회 함수
const findAll = (callback) => {
    // 조회
    NameModel.find({}, (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }

        callback(null, results);
    });
}

// 사용자 추가 함수
const addName = (fullName) => {
    let name = new NameModel({ fullName: fullName }, { setters: true});
    console.log(name);
    name.save();
}
