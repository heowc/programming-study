const express = require('express');
const http = require('http');

const bodyParser = require('body-parser');
// 몽고디비 모듈
const MongoClient = require('mongodb').MongoClient;
// 데이터베이스 객체를 담기 위한 변수
var database;

// 몽고디비 연결을 위한 함수
function Mongo(datasource) {
    this.datasource = datasource;

    this.connect = () => {
        MongoClient.connect(datasource.url, (err, db) => {
            if (err) throw err;

            console.log('connected mongodb');
            // 데이버베이스 객체 할당
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

router.route('/login').post((req, res) => {
    let user = req.body;
    if (database === undefined) {
        res.status(500).send({ message: 'disconnected database' });
        return;
    }

    authUser(database, user, (err, docs) => {
        if (docs === null) {
            res.status(403).send({ message: 'fail' });
            return;
        }

        res.send({ message: 'success'});
    });
});

app.use("/", router);

http.createServer(app).listen(app.get('port'), () => {
    console.log('started express server : ' + app.get('port'));
    // 몽고디비 연결 객체 생성
    let mongo = new Mongo({ url: 'mongodb://localhost:27017/local' });
    // 몽고디비 연결
    mongo.connect();
});

// 사용자 인증 함수
const authUser = (db, user, callback) => {
    // users 컬랙션 참조
    let users = database.collection('users');
    // 조회
    users.find({ id: user.id, password: user.password })
        .toArray((err, docs) => {
            if (err) {
                callback(err, null);
                return;
            }

            if (docs.length > 0) {
                console.log(`${user.id}인 사용자가 존재합니다.`)
                callback(null, docs);
            } else {
                console.log(`${user.id}인 사용자가 존재하지 않습니다.`)
                callback(null, null);
            }
        });
}
