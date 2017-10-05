const express = require('express');
const http = require('http');
const path = require('path');
const static = require('serve-static');

const bodyParser = require('body-parser');
// 파일 업로드용 미들웨어
const multer = require('multer');
const fs = require('fs');

const app = express();
const router = express.Router();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended : false }));

// uploads 디렉토리 오픈
app.use('uploads', static(path.join(__dirname, 'uploads')));

// multer 미들웨어 사용
// *** 순서 중요 ***
// body-parser -> multer -> router
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads')
    },
    filename: (req, file, callback) => {
        let filename = file.originalname;
        filename = filename.substring(0, filename.lastIndexOf('.'));
        filename += Date.now();

        if (file.mimetype === 'image/jpeg') {
            filename += '.jpg';
        }

	    if (file.mimetype === 'image/png') {
		    filename += '.png';
	    }

        callback(null, filename)
    }
});

// 파일 갯수, 크기 제한
const upload = multer({
    storage: storage,
    limits: {
        files: 10,
        fileSize: 1024 * 1024 * 1024
    }
});

// 이름이 file인 데이터 가져옴
router.route('/upload').post(upload.array('file', 1), (req, res) => {

    try {
        let files = req.files;

        console.dir('====== 파일 정보 ======');
        console.dir(req.files[0]);
        console.dir('======================');

        // 파일에 대한 정보를 저장할 변수
        let originalname = '';
        let filename = '';
        let mimetype = '';
        let size = 0;

        if (Array.isArray(files)) {
            let length = files.length;

            for(let i = 0; i < length; i++) {
	            originalname = files[0].originalname;
	            filename = files[0].filename;
	            mimetype = files[0].mimetype;
	            size = files[0].size;
            }
        } else {
            originalname = files[0].originalname;
            filename = files[0].filename;
            mimetype = files[0].mimetype;
            size = files[0].size;
        }

        console.log('기존 이름 : %s'
                    + ', 저장 이름 : %s'
                    + ', MIME 타입 : %s'
                    + ', 크기 : %d'
                    , originalname, filename, mimetype, size);

        res.send({
            originalname : originalname,
            filename : filename,
            mimetype : mimetype,
            size : size
        });

    } catch (err) {
        console.dir(err.stack);
    }
});

app.use("/", router);

http.createServer(app).listen(app.get('port'), () => {
    console.log('started express server : ' + app.get('port'));
});
