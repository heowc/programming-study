const express = require('express');
const http = require('http');

const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var database;

function Mongo(datasource) {
    this.datasource = datasource;

    this.connect = () => {
        MongoClient.connect(datasource.url, (err, db) => {
            if (err) throw err;

            console.log('connected mongodb');
            database = db;
        });
    };

    this.getUrl = () => {
        return datasource.url;
    };
}

const app = express();
const router = express.Router();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());

router.route('/user').post((req, res) => {
    let user = req.body;
    if (database === undefined) {
        res.status(500).send({ message: 'disconnected database' });
        return;
    }

    addUser(database, user, (err, result) => {
        if (result === null || result.insertedCount === 0) {
            res.status(403).send({ message: 'fail' });
            return;
        }

        res.send({ message: 'success'});
    });
});

app.use("/", router);

http.createServer(app).listen(app.get('port'), () => {
    console.log('started express server : ' + app.get('port'));
    let mongo = new Mongo({ url: 'mongodb://localhost:27017/local' });
    mongo.connect();
});

// 사용자 추가 함수
const addUser = (db, user, callback) => {
    let users = database.collection('users');
    // 추가
    users.insertMany([{ id: user.id, password: user.password }], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }

        console.log(`${result.insertedCount}개의 문서가 추가 되습니다`);
        callback(null, result);
    });
}
