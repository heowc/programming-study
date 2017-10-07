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

        UserSchema.statics.findById = (id, callback) => {
            return this.find({ id: id }, callback);
        };

        UserSchema.statics.findAll = (id, callback) => {
            return UserModel.find({ }, callback);
        };
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

router.route('/user').get((req, res) => {
    findUserAll((err, callback) => {
        res.send(callback);
    });
});

router.route('/user/:id').get((req, res) => {
    let id = req.params.id;
    findUserById(id, (err, callback) => {
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
const findUserById = (id, callback) => {
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

// 사용자 전체 조회 함수
const findUserAll = (callback) => {
    // 전체 조회
    UserModel.findAll({}, (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }

        console.log(results);
        if (results.length > 0) {
            console.log(`${results.length}명의 사용자가 존재합니다.`);
            callback(null, results);
        } else {
            callback(null, null);
        }
    });
}
