const express = require('express');
const http = require('http');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var NameModel;

function Mongo(datasource) {
    this.datasource = datasource;

    this.connect = () => {
        console.log('connecting mongoose');

        mongoose.connect(datasource.url, { useMongoClient: true });
        mongoose.Promise = global.Promise;
        console.log('connected mongoose');

        createNameProperty();
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
    
    addName(fullName);
	findAll((err, results) => {
        if (err) throw err;

        console.log(results);
    });
}

const createNameProperty = () => {
    let NameSchema = new Schema({
        first_name: String,
        last_name: String
    });

    // NameSchema
    //     .virtual('fullName')
    //     .set(function(fullName) {
    //         let array = fullName.split(' ');
    //         this.first_name = array[1];
    //         this.last_name = array[0];
    //         console.log('setting virtual fullName : %s, %s', this.last_name, this.first_name);
    //     })
    //     .get(function() {
    //         return this.last_name + ' ' + this.first_name;
    //     });
    class Name {
        constructor(first_name, last_name) {
            this.first_name = first_name;
            this.last_name = last_name;
        }

        set fullName(value) {
            let array = value.split(' ');
            this.first_name = array[0];
            this.last_name = array[1];
        }

        get fullName() {
            return `${this.first_name} ${this.last_name}`;
        }
    }
    NameSchema.loadClass(Name);

    console.log('defined schema');

    NameModel = mongoose.model("name", NameSchema);
    console.log('defined model');
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
    let name = new NameModel({ fullName: fullName });
    name.save();
}
