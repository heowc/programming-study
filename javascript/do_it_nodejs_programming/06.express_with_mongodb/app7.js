const express = require('express');
const http = require('http');

const crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var UserModel;

function Mongo(datasource) {
    this.datasource = datasource;

    this.connect = () => {
        console.log('connecting mongoose');

        mongoose.connect(datasource.url, { useMongoClient: true });
        mongoose.Promise = global.Promise;
        console.log('connected mongoose');

        createUserProperty();
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
    let user = {
        id: 'heowc',
        cypto: '1234'
    };

    addUser(user, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            authUser({ id: 'heowc', password: '12345' }, (err, result) => {
                if (err) throw err;

                if (result == null) {
                    console.log('fail');
                } else {
                    console.log('success');
                }
            });
        }
    });
}

const createUserProperty = () => {
    let UserSchema = new Schema({
        id: String,
        password: String,
        salt: String
    });

    class User {
        constructor(id, cypto) {
            this.id = id;
            this.cypto = cypto;
        }

        set cypto(cypto) {
            this._password = cypto;
            this.salt = this.makeSalt();
            this.password = this.encryptPassword(cypto);
            console.log(`암호화된 비밀번호 : ${this.password}`);
        }

        get cypto() {
            return this._password;
        }

        getCypto() {
            return this._password;
        }

        // salt 생성
        makeSalt() {
            return Math.round(new Date().valueOf() * Math.random()) + '';
        }

        // 암호화 적용
        encryptPassword(password, inSalt) {
            return inSalt
                    ? crypto.createHmac('sha1', inSalt).update(password).digest('hex')
                    : crypto.createHmac('sha1', this.salt).update(password).digest('hex');
        }

        // 비밀번호 검증
        isAuthentication(password) {
            return this.encryptPassword(password) === this.password;
        }
    }
    UserSchema.loadClass(User);
    console.log('defined schema');

    UserModel = mongoose.model("user", UserSchema);
    console.log('defined model');
}

// 사용자 검중 함수
const authUser = (user, callback) => {
    UserModel.findOne({ id: user.id }, (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }

        if (result == null) {
            callback(null, null);
            return;
        }

        let authenticated = result.isAuthentication(user.password);
        if (authenticated) {
            callback(null, result);
        } else {
            callback(null, null);
        }
    });
}

// 사용자 조회 함수
const findAll = (callback) => {
    // 조회
    UserModel.find({}, (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }

        callback(null, results);
    });
}

// 사용자 추가 함수
const addUser = (user, callback) => {
    let userModel = new UserModel(user);
    console.log(userModel);
    userModel.save((err, result) => {
        if (err) {
            console.log(err);
            callback(err, null)
        }

        callback(null, result);
    });
}
