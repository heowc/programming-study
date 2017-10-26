const express = require('express');
const http = require('http');

const serveStatic = require('serve-static');
const path = require('path');

// socket.io 모듈 참조
const socketio = require('socket.io');
// cors 모듈 참조
const cors = require('cors');

const app = express();

app.set('port', process.env.PORT || 3000);

// cors 모듈 미들웨어로 사용
app.use(cors());
app.use(serveStatic(path.join(__dirname, 'public')));
// http 생성
const httpServer =
http.createServer(app).listen(app.get('port'), () => {
	console.log('started node server');
});

// socket.io를 http에 참조 시작
const io = socketio.listen(httpServer);

console.log('connecting socket.io');

// socket.io 이벤트 처리
io.sockets.on('connection', (socket) => {
	console.log('connected socket.io');

	socket.on('message', (message) => {
		console.log('received message');
		console.log(message);

		if (message.recepient === 'ALL') {
			console.log('sending ALL');
			io.sockets.emit('message', message);
			// socket.broadcast.emit('message', message);
		}
	});
});
