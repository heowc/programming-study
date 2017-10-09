const express = require('express');
const http = require('http');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var UserModel;

function Mongo(datasource) {
    this.datasource = datasource;

    this.connect = () => {
        console.log('connecting mongoose');

        let connection = mongoose.createConnection(datasource.url);
        console.log('connected mongoose');

        let UserSchema = mongoose.Schema({
            id: String,
            name: String,
            password: String
        });
        console.log('defined schema');

        UserModel = connection.model("users", UserSchema);
        console.log('defined model');
    };

    this.getUrl = () => {
        return datasource.url;
    };
}

const app = express();
const router = express.Router();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());

router.route('/user/:id').get((req, res) => {
    let id = req.params.id;
    authUser(id, (err, callback) => {
        res.send(callback);
    });
});

router.route('/user').post((req, res) => {
    let user = req.body;
    addUser(user, (err, callback) => {
        res.send(callback);
    });
});

app.use("/", router);

http.createServer(app).listen(app.get('port'), () => {
    console.log('started express server : ' + app.get('port'));
    let mongo = new Mongo({ url: 'mongodb://localhost/local' });
    mongo.connect();
});

// 사용자 조회 함수
const findUser = (id, callback) => {
    // 조회
    UserModel.find({ id: id }, (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }

        if (results.length > 0) {
            console.log(`${id}인 사용자가 존재합니다.`);
            callback(null, results);
        } else {
            console.log(`${id}인 사용자가 존재하지 않습니다.`);
            callback(null, null);
        }
    });
}

// 사용자 추가 함수
const addUser = (user, callback) => {
    // 추가
    UserModel.create(user, (err, small) => {
        if (err) {
            callback(err, null);
            return;
        }

        callback(null, small);
    });
}
